import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiInfo, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { heroSlideIn, heroSlideOut, animateElement } from '../utils/gsapAnimations';

const HeroSlider = ({ content = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const contentRef = useRef(null);

  // Auto-advance slides
  useEffect(() => {
    if (content.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % content.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [content.length]);

  // Animate slide changes
  useEffect(() => {
    if (slideRef.current) {
      heroSlideIn(slideRef.current);
    }
    if (contentRef.current) {
      animateElement(contentRef.current, 'fadeInLeft', 0.3);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (slideRef.current) {
      heroSlideOut(slideRef.current);
    }
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % content.length);
    }, 300);
  };

  const prevSlide = () => {
    if (slideRef.current) {
      heroSlideOut(slideRef.current);
    }
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + content.length) % content.length);
    }, 300);
  };

  if (!content || content.length === 0) {
    return (
      <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading featured content...</p>
        </div>
      </div>
    );
  }

  const currentContent = content[currentSlide];

  return (
    <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
      <div
        ref={slideRef}
        className="absolute inset-0"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${currentContent.backdrop || currentContent.poster})`
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 w-full">
            <div 
              ref={contentRef}
              className="max-w-xl lg:max-w-2xl opacity-0"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                {currentContent.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                  {currentContent.type === 'movie' ? 'Movie' : 'Series'}
                </span>
                <span className="text-green-400 font-medium text-xs sm:text-sm">
                  {currentContent.rating?.imdb}/10 IMDb
                </span>
                <span className="text-gray-300 text-xs sm:text-sm">
                  {currentContent.releaseYear}
                </span>
                <span className="text-gray-300 text-xs sm:text-sm">
                  {currentContent.type === 'movie' 
                    ? `${currentContent.duration} min`
                    : `${currentContent.duration} seasons`
                  }
                </span>
              </div>

              <p className="text-gray-200 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3">
                {currentContent.description}
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <Link
                  to={`/watch/${currentContent._id}`}
                  className="bg-white text-black px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-md font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors text-sm sm:text-base"
                >
                  <FiPlay className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Play</span>
                </Link>
                <Link
                  to={`/content/${currentContent._id}`}
                  className="bg-gray-600/80 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-md font-semibold flex items-center space-x-2 hover:bg-gray-600 transition-colors text-sm sm:text-base"
                >
                  <FiInfo className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>More Info</span>
                </Link>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
                {currentContent.genre?.slice(0, 3).map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-800/60 text-gray-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      {content.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden sm:block absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          >
            <FiChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden sm:block absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors z-10"
          >
            <FiChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {content.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {content.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;