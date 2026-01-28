# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service
- **macOS**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

### 3. Seed Database
```bash
cd backend
npm run seed
```

### 4. Start Backend Server
```bash
cd backend
npm start
```
Backend will run on: http://localhost:5000

### 5. Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:5173

## 🎯 Demo Credentials

**Regular User:**
- Email: `user@ottplatform.com`
- Password: `user123`

**Admin User:**
- Email: `admin@ottplatform.com`
- Password: `admin123`

## 🔧 Troubleshooting

### CSS Build Issues
If you encounter CSS parsing errors, run:
```bash
cd frontend
npm install tailwindcss@latest autoprefixer@latest postcss@latest
```

### MongoDB Connection Issues
Update the MongoDB URI in `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/ottplatform
```

### Port Conflicts
If ports are in use, update:
- Backend port in `backend/.env`
- Frontend will auto-assign available port

## 📱 Features to Test

1. **Browse Homepage** - View featured content and categories
2. **Search & Filter** - Use search with genre/language filters
3. **Watch Content** - Click play to test video player
4. **User Profile** - View watch history and favorites
5. **Subscriptions** - Check subscription plans
6. **Admin Panel** - Login as admin to manage content

## 🎬 Ready to Go!

Your modern OTT platform is now ready! The application includes:
- Netflix-like UI with dark theme
- Responsive design for all devices
- Custom video player with full controls
- User authentication and profiles
- Admin dashboard for content management
- Subscription system with multiple tiers

Enjoy building your CineFlex streaming platform! 🍿