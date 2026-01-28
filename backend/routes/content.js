const express = require('express');
const Content = require('../models/Content');
const router = express.Router();

// Get all content with filters
router.get('/', async (req, res) => {
  try {
    const {
      type,
      genre,
      language,
      year,
      featured,
      trending,
      popular,
      newRelease,
      topRated,
      search,
      page = 1,
      limit = 20
    } = req.query;

    let query = { status: 'active' };

    // Apply filters
    if (type) query.type = type;
    if (genre) query.genre = { $in: genre.split(',') };
    if (language) query.language = language;
    if (year) query.releaseYear = year;
    if (featured === 'true') query.featured = true;
    if (trending === 'true') query.trending = true;
    if (popular === 'true') query.popular = true;
    if (newRelease === 'true') query.newRelease = true;
    if (topRated === 'true') query.topRated = true;

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

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
    console.error('Get content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Increment views
    content.views += 1;
    await content.save();

    res.json(content);
  } catch (error) {
    console.error('Get content by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get featured content for hero slider
router.get('/featured/slider', async (req, res) => {
  try {
    const featuredContent = await Content.find({ 
      featured: true, 
      status: 'active' 
    }).limit(5);
    
    res.json(featuredContent);
  } catch (error) {
    console.error('Get featured content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get content by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 20 } = req.query;

    let query = { status: 'active' };

    switch (category) {
      case 'trending':
        query.trending = true;
        break;
      case 'popular':
        query.popular = true;
        break;
      case 'new-releases':
        query.newRelease = true;
        break;
      case 'top-rated':
        query.topRated = true;
        break;
      default:
        return res.status(400).json({ message: 'Invalid category' });
    }

    const content = await Content.find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json(content);
  } catch (error) {
    console.error('Get category content error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get genres
router.get('/meta/genres', async (req, res) => {
  try {
    const genres = await Content.distinct('genre');
    res.json(genres);
  } catch (error) {
    console.error('Get genres error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get languages
router.get('/meta/languages', async (req, res) => {
  try {
    const languages = await Content.distinct('language');
    res.json(languages);
  } catch (error) {
    console.error('Get languages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;