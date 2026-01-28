const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['movie', 'series'],
    required: true
  },
  genre: [{
    type: String,
    required: true
  }],
  language: {
    type: String,
    required: true,
    default: 'English'
  },
  releaseYear: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in minutes for movies, episodes for series
    required: true
  },
  rating: {
    imdb: {
      type: Number,
      min: 0,
      max: 10,
      default: 0
    },
    platform: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  poster: {
    type: String,
    required: true
  },
  backdrop: {
    type: String,
    required: true
  },
  trailer: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    required: true
  },
  cast: [{
    name: {
      type: String,
      required: true
    },
    character: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/150x200/333/fff?text=Actor'
    }
  }],
  director: {
    type: String,
    required: true
  },
  producer: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  popular: {
    type: Boolean,
    default: false
  },
  newRelease: {
    type: Boolean,
    default: false
  },
  topRated: {
    type: Boolean,
    default: false
  },
  subscriptionRequired: {
    type: String,
    enum: ['basic', 'standard', 'premium'],
    default: 'basic'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  // For series only
  seasons: [{
    seasonNumber: Number,
    episodes: [{
      episodeNumber: Number,
      title: String,
      description: String,
      duration: Number, // in minutes
      videoUrl: String,
      thumbnail: String
    }]
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'coming_soon'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for search functionality
contentSchema.index({
  title: 'text',
  description: 'text',
  genre: 'text',
  cast: 'text'
});

module.exports = mongoose.model('Content', contentSchema);