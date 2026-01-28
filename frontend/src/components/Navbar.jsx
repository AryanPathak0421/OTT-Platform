import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiSearch, 
  FiUser, 
  FiLogOut, 
  FiSettings, 
  FiHeart,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { navbarSlideDown, animateElement } from '../utils/gsapAnimations';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    if (navRef.current) {
      navbarSlideDown(navRef.current);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen && mobileMenuRef.current) {
      animateElement(mobileMenuRef.current, 'fadeInUp');
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isProfileOpen && profileDropdownRef.current) {
      animateElement(profileDropdownRef.current, 'scaleIn');
    }
  }, [isProfileOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Don't show navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-lg">C</span>
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">CineFlex</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/search' 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Browse
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/admin' 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="search"
                  placeholder="Search movies, series..."
                  className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-700 transition-colors text-sm"
                />
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon for Mobile */}
            <Link
              to="/search"
              className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
            >
              <FiSearch className="w-5 h-5" />
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <img
                    src={user?.avatar || 'https://via.placeholder.com/32x32/333/fff?text=U'}
                    alt="Profile"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:block text-sm truncate max-w-20">{user?.name}</span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div
                    ref={profileDropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50"
                  >
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/subscription"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <FiSettings className="w-4 h-4" />
                      <span>Subscription</span>
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white transition-colors p-1"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden border-t border-gray-800 py-3"
          >
            <div className="space-y-3">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="md:hidden">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search movies, series..."
                    className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-gray-700 transition-colors text-sm"
                  />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  Home
                </Link>
                <Link
                  to="/search"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                >
                  Browse
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;