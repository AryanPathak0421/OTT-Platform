const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Content = require('../models/Content');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify admin middleware
const verifyAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get dashboard stats
router.get('/dashboard', verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalContent = await Content.countDocuments();
    const totalMovies = await Content.countDocuments({ type: 'movie' });
    const totalSeries = await Content.countDocuments({ type: 'series' });
    
    const subscriptionStats = await User.aggregate([
      {
        $group: {
          _id: '$subscription.plan',
          count: { $sum: 1 }
        }
      }
    ]);

    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContent = await Content.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        totalContent,
        totalMovies,
        totalSeries,
        subscriptionStats
      },
      recentUsers,
      recentContent
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .select('-password')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create content
router.post('/content', verifyAdmin, async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    console.error('Create content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update content
router.put('/content/:id', verifyAdmin, async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete content
router.delete('/content/:id', verifyAdmin, async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all content for admin
router.get('/content', verifyAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search, type, status } = req.query;
    
    let query = {};
    if (search) {
      query.$text = { $search: search };
    }
    if (type) query.type = type;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const content = await Content.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Content.countDocuments(query);

    res.json({
      content,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get admin content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user subscription
router.put('/users/:id/subscription', verifyAdmin, async (req, res) => {
  try {
    const { plan, status } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        'subscription.plan': plan,
        'subscription.status': status,
        'subscription.expiryDate': status === 'active' 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          : new Date()
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;