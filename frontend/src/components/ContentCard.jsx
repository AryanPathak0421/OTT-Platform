import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiInfo, FiHeart, FiStar } from 'react-icons/fi';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { cardHoverIn, cardHoverOut, animateWithScrollTrigger } from '../utils/gsapAnimations';

const ContentCard = ({ content, showProgress = false, progress = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToFavorites, removeFromFavorites, favorites } = useContent();
  const { isAuthenticated } = useAuth();
  
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      animateWithScrollTrigger(cardRef.current, 'scaleIn');
    }
  }, []);

  const isFavorite = favorites.some(fav => fav._id === content._id);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) return;

    if (isFavorite) {
      await removeFromFavorites(content._id);
    } else {
      await addToFavorites(content._id);
    }
  };

  const handleMouseEnter = () => {
    if (cardRef.current) {
      cardHoverIn(cardRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardHoverOut(cardRef.current);
    }
  };

  const formatDuration = (duration) => {
    if (content.type === 'movie') {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
    return `${duration} seasons`;
  };

  const progressPercentage = showProgress && progress ? (progress / (content.duration * 60)) * 100 : 0;

  return (
    <div
      ref={cardRef}
      className="relative w-72 group cursor-pointer opacity-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/content/${content._id}`}>
        <div className="relative overflow-hidden rounded-lg bg-gray-800">
          {/* Poster Image */}
          <div className="relative aspect-[2/3]">
            <img
              src={content.poster}
              alt={content.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-600 rounded"></div>
              </div>
            )}

            {/* Progress Bar */}
            {showProgress && progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2">
                <Link
                  to={`/watch/${content._id}`}
                  className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiPlay className="w-5 h-5" />
                </Link>
                <Link
                  to={`/content/${content._id}`}
                  className="bg-gray-600/80 text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiInfo className="w-5 h-5" />
                </Link>
                {isAuthenticated && (
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-3 rounded-full transition-colors ${
                      isFavorite
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-600/80 text-white hover:bg-gray-600'
                    }`}
                  >
                    <FiHeart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                )}
              </div>
            </div>

            {/* Rating Badge */}
            {content.rating?.imdb && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded flex items-center space-x-1">
                <FiStar className="w-3 h-3 text-yellow-400" />
                <span className="text-xs font-medium">{content.rating.imdb}</span>
              </div>
            )}

            {/* Type Badge */}
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium uppercase">
              {content.type}
            </div>
          </div>

          {/* Content Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
              {content.title}
            </h3>
            
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>{content.releaseYear}</span>
              <span>{formatDuration(content.duration)}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1 mb-3">
              {content.genre?.slice(0, 2).map((genre, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm line-clamp-2">
              {content.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard;