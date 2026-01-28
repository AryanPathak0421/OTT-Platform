# CineFlex - Modern OTT Platform

A modern, responsive OTT (Over-The-Top) platform built with the MERN stack, featuring a Netflix-like interface with comprehensive streaming capabilities.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Dark theme inspired by Netflix and Prime Video
- **Responsive Design**: Fully responsive for desktop, tablet, and mobile
- **Hero Slider**: Large banner showcasing featured content
- **Content Sections**: Trending, Popular, New Releases, Top Rated, Continue Watching
- **Advanced Search**: Search with filters by genre, language, year
- **User Authentication**: Login/Register with JWT
- **User Profiles**: Watch history, favorites, subscription management
- **Video Player**: Custom video player with full controls
- **Subscription Plans**: Basic, Standard, Premium tiers
- **Admin Dashboard**: Content and user management

### Backend Features
- **RESTful API**: Complete API for content and user management
- **Authentication**: JWT-based authentication system
- **Database**: MongoDB with Mongoose ODM
- **Content Management**: CRUD operations for movies and series
- **User Management**: Profile, watch history, favorites
- **Admin Panel**: Dashboard with analytics and management tools
- **Subscription System**: Multi-tier subscription management

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Update .env file with your MongoDB URI and JWT secret
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ottplatform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Seed the database with sample data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm start
# or for development with auto-restart
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🎯 Usage

### Demo Credentials

After seeding the database, you can use these demo accounts:

**Regular User:**
- Email: `user@ottplatform.com`
- Password: `user123`

**Admin User:**
- Email: `admin@ottplatform.com`
- Password: `admin123`

### Key Features to Test

1. **Browse Content**: Explore the homepage with different content sections
2. **Search**: Use the search functionality with filters
3. **Watch Content**: Click play on any content to test the video player
4. **User Profile**: View watch history and manage favorites
5. **Subscriptions**: Check out the subscription plans page
6. **Admin Dashboard**: Login as admin to access management features

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured experience with hover effects
- **Tablet**: Touch-optimized interface with adapted layouts
- **Mobile**: Mobile-first design with optimized navigation

## 🎨 Design Features

- **Dark Theme**: Netflix-inspired dark color scheme
- **Smooth Animations**: Framer Motion powered transitions
- **Hover Effects**: Interactive card animations and overlays
- **Modern Typography**: Clean, readable font hierarchy
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Content
- `GET /api/content` - Get all content with filters
- `GET /api/content/:id` - Get content by ID
- `GET /api/content/category/:category` - Get content by category
- `GET /api/content/meta/genres` - Get all genres
- `GET /api/content/meta/languages` - Get all languages

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/watch-history` - Add to watch history
- `GET /api/user/watch-history` - Get watch history
- `POST /api/user/favorites/:id` - Add to favorites
- `DELETE /api/user/favorites/:id` - Remove from favorites

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/content` - Get all content (admin)
- `POST /api/admin/content` - Create content
- `PUT /api/admin/content/:id` - Update content
- `DELETE /api/admin/content/:id` - Delete content
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Update environment variables for production
3. Deploy to Heroku, Railway, or your preferred platform

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```
2. Deploy to Vercel, Netlify, or your preferred platform
3. Update API endpoints to point to your backend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from Netflix and Amazon Prime Video
- Icons from React Icons
- Images from Unsplash (for demo purposes)
- Sample video content for demonstration

## 📞 Support

For support, email support@cineflex.com or create an issue in the repository.

---

**Note**: This is a demo project for educational purposes. Replace placeholder content and implement proper video streaming infrastructure for production use.