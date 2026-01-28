import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ContentContext = createContext();

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider = ({ children }) => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [popularContent, setPopularContent] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial content
  useEffect(() => {
    fetchInitialContent();
    fetchGenres();
    fetchLanguages();
  }, []);

  const fetchInitialContent = async () => {
    try {
      setLoading(true);
      
      const [
        featuredRes,
        trendingRes,
        popularRes,
        newReleasesRes,
        topRatedRes
      ] = await Promise.all([
        axios.get('http://localhost:5000/api/content?featured=true&limit=5'),
        axios.get('http://localhost:5000/api/content/category/trending?limit=20'),
        axios.get('http://localhost:5000/api/content/category/popular?limit=20'),
        axios.get('http://localhost:5000/api/content/category/new-releases?limit=20'),
        axios.get('http://localhost:5000/api/content/category/top-rated?limit=20')
      ]);

      setFeaturedContent(featuredRes.data.content || featuredRes.data);
      setTrendingContent(trendingRes.data);
      setPopularContent(popularRes.data);
      setNewReleases(newReleasesRes.data);
      setTopRated(topRatedRes.data);
    } catch (error) {
      console.error('Error fetching initial content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/content/meta/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchLanguages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/content/meta/languages');
      setLanguages(response.data);
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const fetchUserContent = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const [historyRes, continueRes, favoritesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/user/watch-history'),
        axios.get('http://localhost:5000/api/user/continue-watching'),
        axios.get('http://localhost:5000/api/user/favorites')
      ]);

      setWatchHistory(historyRes.data);
      setContinueWatching(continueRes.data);
      setFavorites(favoritesRes.data);
    } catch (error) {
      console.error('Error fetching user content:', error);
    }
  };

  const searchContent = async (query, filters = {}) => {
    try {
      const params = new URLSearchParams({
        search: query,
        ...filters
      });

      const response = await axios.get(`http://localhost:5000/api/content?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error searching content:', error);
      return { content: [], pagination: { total: 0 } };
    }
  };

  const getContentById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/content/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching content by ID:', error);
      return null;
    }
  };

  const addToWatchHistory = async (contentId, progress = 0, completed = false) => {
    try {
      await axios.post('http://localhost:5000/api/user/watch-history', {
        contentId,
        progress,
        completed
      });
      
      // Refresh user content
      fetchUserContent();
    } catch (error) {
      console.error('Error adding to watch history:', error);
    }
  };

  const addToFavorites = async (contentId) => {
    try {
      await axios.post(`http://localhost:5000/api/user/favorites/${contentId}`);
      fetchUserContent();
      return { success: true };
    } catch (error) {
      console.error('Error adding to favorites:', error);
      return { success: false, message: 'Failed to add to favorites' };
    }
  };

  const removeFromFavorites = async (contentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/favorites/${contentId}`);
      fetchUserContent();
      return { success: true };
    } catch (error) {
      console.error('Error removing from favorites:', error);
      return { success: false, message: 'Failed to remove from favorites' };
    }
  };

  const value = {
    // Content data
    featuredContent,
    trendingContent,
    popularContent,
    newReleases,
    topRated,
    watchHistory,
    continueWatching,
    favorites,
    genres,
    languages,
    loading,
    
    // Functions
    fetchInitialContent,
    fetchUserContent,
    searchContent,
    getContentById,
    addToWatchHistory,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};