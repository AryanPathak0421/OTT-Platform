const mongoose = require('mongoose');
const Content = require('../models/Content');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ottplatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleMovies = [
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    type: "movie",
    genre: ["Action", "Crime", "Drama"],
    language: "English",
    releaseYear: 2008,
    duration: 152,
    rating: { imdb: 9.0, platform: 4.8 },
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=675&fit=crop",
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    cast: [
      { name: "Christian Bale", character: "Bruce Wayne / Batman", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" },
      { name: "Heath Ledger", character: "The Joker", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" }
    ],
    director: "Christopher Nolan",
    producer: "Emma Thomas",
    featured: true,
    trending: true,
    popular: true,
    topRated: true,
    subscriptionRequired: "basic"
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    type: "movie",
    genre: ["Action", "Sci-Fi", "Thriller"],
    language: "English",
    releaseYear: 2010,
    duration: 148,
    rating: { imdb: 8.8, platform: 4.7 },
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=675&fit=crop",
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    cast: [
      { name: "Leonardo DiCaprio", character: "Dom Cobb", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" },
      { name: "Marion Cotillard", character: "Mal", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" }
    ],
    director: "Christopher Nolan",
    producer: "Emma Thomas",
    featured: true,
    popular: true,
    topRated: true,
    subscriptionRequired: "standard"
  },
  {
    title: "Avengers: Endgame",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more.",
    type: "movie",
    genre: ["Action", "Adventure", "Drama"],
    language: "English",
    releaseYear: 2019,
    duration: 181,
    rating: { imdb: 8.4, platform: 4.6 },
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=675&fit=crop",
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    cast: [
      { name: "Robert Downey Jr.", character: "Tony Stark / Iron Man", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" },
      { name: "Chris Evans", character: "Steve Rogers / Captain America", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" }
    ],
    director: "Anthony Russo, Joe Russo",
    producer: "Kevin Feige",
    featured: true,
    trending: true,
    newRelease: false,
    subscriptionRequired: "premium"
  },
  {
    title: "Parasite",
    description: "A poor family schemes to become employed by a wealthy family by infiltrating their household and posing as unrelated, highly qualified individuals.",
    type: "movie",
    genre: ["Comedy", "Drama", "Thriller"],
    language: "Korean",
    releaseYear: 2019,
    duration: 132,
    rating: { imdb: 8.6, platform: 4.5 },
    poster: "https://images.unsplash.com/photo-1489599162810-1e666c4b8e8e?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1489599162810-1e666c4b8e8e?w=1200&h=675&fit=crop",
    trailer: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    cast: [
      { name: "Song Kang-ho", character: "Ki-taek", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" },
      { name: "Lee Sun-kyun", character: "Park Dong-ik", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" }
    ],
    director: "Bong Joon-ho",
    producer: "Kwak Sin-ae",
    topRated: true,
    newRelease: true,
    subscriptionRequired: "standard"
  }
];

const sampleSeries = [
  {
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    type: "series",
    genre: ["Drama", "Fantasy", "Horror"],
    language: "English",
    releaseYear: 2016,
    duration: 4, // seasons
    rating: { imdb: 8.7, platform: 4.6 },
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=675&fit=crop",
    trailer: "https://www.youtube.com/watch?v=b9EkMc79ZSU",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    cast: [
      { name: "Millie Bobby Brown", character: "Eleven", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" },
      { name: "Finn Wolfhard", character: "Mike Wheeler", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" }
    ],
    director: "The Duffer Brothers",
    producer: "Shawn Levy",
    featured: true,
    trending: true,
    popular: true,
    subscriptionRequired: "basic",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            episodeNumber: 1,
            title: "Chapter One: The Vanishing of Will Byers",
            description: "On his way home from a friend's house, young Will sees something terrifying.",
            duration: 47,
            videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop"
          }
        ]
      }
    ]
  },
  {
    title: "The Crown",
    description: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
    type: "series",
    genre: ["Biography", "Drama", "History"],
    language: "English",
    releaseYear: 2016,
    duration: 6, // seasons
    rating: { imdb: 8.6, platform: 4.5 },
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=675&fit=crop",
    trailer: "https://www.youtube.com/watch?v=JWtnJjn6ng0",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    cast: [
      { name: "Claire Foy", character: "Queen Elizabeth II", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" },
      { name: "Matt Smith", character: "Prince Philip", image: "https://via.placeholder.com/150x200/333/fff?text=Actor" }
    ],
    director: "Peter Morgan",
    producer: "Andy Harries",
    topRated: true,
    popular: true,
    subscriptionRequired: "premium"
  }
];

const seedData = async () => {
  try {
    // Clear existing data
    await Content.deleteMany({});
    await User.deleteMany({});

    // Create admin user
    const adminUser = new User({
      name: "Admin User",
      email: "admin@ottplatform.com",
      password: "admin123",
      isAdmin: true,
      subscription: {
        plan: "premium",
        status: "active"
      }
    });
    await adminUser.save();

    // Create regular user
    const regularUser = new User({
      name: "John Doe",
      email: "user@ottplatform.com",
      password: "user123",
      subscription: {
        plan: "standard",
        status: "active"
      }
    });
    await regularUser.save();

    // Insert sample content
    await Content.insertMany([...sampleMovies, ...sampleSeries]);

    console.log('Database seeded successfully!');
    console.log('Admin credentials: admin@ottplatform.com / admin123');
    console.log('User credentials: user@ottplatform.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();