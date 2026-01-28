# GSAP & Lenis Setup Guide

## 🚀 Quick Setup for GSAP and Lenis

Follow these steps to properly install and configure GSAP with Lenis for smooth animations:

### 1. Install Dependencies
```bash
cd frontend

# Remove existing node_modules
rm -rf node_modules package-lock.json .vite

# Install all dependencies
npm install

# If GSAP installation fails, try installing individually
npm install gsap@3.12.2
npm install lenis@1.0.42
```

### 2. Alternative Installation (if npm fails)
```bash
# Use yarn instead
npm install -g yarn
yarn install

# Or install with specific registry
npm install gsap --registry https://registry.npmjs.org/
npm install lenis --registry https://registry.npmjs.org/
```

### 3. Manual GSAP Installation
If you still get import errors, GSAP might need manual installation:

```bash
# Download GSAP manually
npm install gsap@latest --save
npm install @gsap/react --save

# Clear cache and restart
npm cache clean --force
rm -rf .vite
npm run dev
```

### 4. Fallback Mode
The code is designed to work with fallbacks:
- If GSAP fails to load → Uses CSS transitions
- If Lenis fails to load → Uses native smooth scroll
- If ScrollTrigger fails → Uses Intersection Observer

### 5. Verify Installation
Check if packages are installed:
```bash
npm list gsap
npm list lenis
```

## 🔧 Troubleshooting

### Error: Cannot resolve 'gsap'
```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json .vite dist
npm cache clean --force
npm install
```

### Error: ScrollTrigger not found
```bash
# GSAP ScrollTrigger is included in GSAP 3.12+
npm install gsap@latest
```

### Error: Lenis import failed
```bash
# Install specific version
npm install lenis@1.0.42
```

## ✅ Expected Behavior

**With GSAP & Lenis (Full Experience):**
- Smooth momentum scrolling
- Professional animations
- Scroll-triggered effects
- Optimized performance

**With Fallbacks (Basic Experience):**
- Native smooth scrolling
- CSS transition animations
- Intersection Observer triggers
- Still fully functional

## 🎬 Features That Work

Even with fallbacks, you'll get:
- ✅ Smooth scrolling (native)
- ✅ Fade-in animations
- ✅ Hover effects
- ✅ Mobile optimization
- ✅ All functionality intact

## 🚀 Start Development

```bash
npm run dev
```

The app will work regardless of whether GSAP/Lenis load successfully. The fallback system ensures a smooth experience in all cases!

## 📱 Mobile Performance

The fallback system is actually better for some mobile devices:
- Lower memory usage
- Better battery life
- Faster initial load
- Native touch scrolling