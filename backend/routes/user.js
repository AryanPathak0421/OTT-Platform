const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Content = require('../models/Content');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('watchHistory.contentId', 'title poster type duration')
      .populate('favorites', 'title poster type rating');

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, avatar },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to watch history
router.post('/watch-history', verifyToken, async (req, res) => {
  try {
    const { contentId, progress, completed } = req.body;

    const user = await User.findById(req.user.userId);
    
    // Check if content already in watch history
    const existingIndex = user.watchHistory.findIndex(
      item => item.contentId.toString() === contentId
    );

    if (existingIndex !== -1) {
      // Update existing entry
      user.watchHistory[existingIndex].progress = progress;
      user.watchHistory[existingIndex].completed = completed;
      user.watchHistory[existingIndex].watchedAt = new Date();
    } else {
      // Add new entry
      user.watchHistory.unshift({
        contentId,
        progress,
        completed,
        watchedAt: new Date()
      });
    }

    // Keep only last 50 items
    if (user.watchHistory.length > 50) {
      user.watchHistory = user.watchHistory.slice(0, 50);
    }

    await user.save();
    res.json({ message: 'Watch history updated' });
  } catch (error) {
    console.error('Add watch history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get watch history
router.get('/watch-history', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('watchHistory.contentId', 'title poster type duration rating');

    const watchHistory = user.watchHistory.filter(item => item.contentId);
    res.json(watchHistory);
  } catch (error) {
    console.error('Get watch history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get continue watching
router.get('/continue-watching', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('watchHistory.contentId', 'title poster type duration rating');

    const continueWatching = user.watchHistory
      .filter(item => item.contentId && !item.completed && item.progress > 0)
      .slice(0, 10);

    res.json(continueWatching);
  } catch (error) {
    console.error('Get continue watching error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to favorites
router.post('/favorites/:contentId', verifyToken, async (req, res) => {
  try {
    const { contentId } = req.params;
    
    const user = await User.findById(req.user.userId);
    
    if (!user.favorites.includes(contentId)) {
      user.favorites.push(contentId);
      await user.save();
    }

    res.json({ message: 'Added to favorites' });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from favorites
router.delete('/favorites/:contentId', verifyToken, async (req, res) => {
  try {
    const { contentId } = req.params;
    
    const user = await User.findById(req.user.userId);
    user.favorites = user.favorites.filter(id => id.toString() !== contentId);
    await user.save();

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Remove from favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get favorites
router.get('/favorites', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('favorites', 'title poster type rating genre');

    res.json(user.favorites);
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update subscription
router.put('/subscription', verifyToken, async (req, res) => {
  try {
    const { plan } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { 
        'subscription.plan': plan,
        'subscription.status': 'active',
        'subscription.expiryDate': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error('Update subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;