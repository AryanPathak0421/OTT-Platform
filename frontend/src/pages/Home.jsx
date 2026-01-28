import React, { useEffect, useRef } from 'react';
import HeroSlider from '../components/HeroSlider';
import ContentRow from '../components/ContentRow';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { animateWithScrollTrigger } from '../utils/gsapAnimations';

const Home = () => {
  const {
    featuredContent,
    trendingContent,
    popularContent,
    newReleases,
    topRated,
    continueWatching,
    loading,
    fetchUserContent
  } = useContent();
  
  const { isAuthenticated } = useAuth();
  
  const contentSectionsRef = useRef([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserContent();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Animate content sections with scroll triggers
    contentSectionsRef.current.forEach((section, index) => {
      if (section) {
        animateWithScrollTrigger(section, 'fadeInUp', {
          delay: index * 0.1
        });
      }
    });
  }, [loading, continueWatching, trendingContent, popularContent, newReleases, topRated]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-14 sm:pt-16">
      {/* Hero Slider */}
      <HeroSlider content={featuredContent} />

      {/* Content Sections */}
      <div className="px-3 sm:px-4 lg:px-6 pb-16 sm:pb-20 space-y-8 sm:space-y-12">
        {/* Continue Watching - Only show if user is authenticated and has content */}
        {isAuthenticated && continueWatching.length > 0 && (
          <div
            ref={el => contentSectionsRef.current[0] = el}
            className="opacity-0"
          >
            <ContentRow
              title="Continue Watching"
              content={continueWatching.map(item => ({
                ...item.contentId,
                progress: item.progress,
                watchedAt: item.watchedAt
              }))}
              showProgress={true}
            />
          </div>
        )}

        {/* Trending Now */}
        <div
          ref={el => contentSectionsRef.current[1] = el}
          className="opacity-0"
        >
          <ContentRow
            title="Trending Now"
            content={trendingContent}
          />
        </div>

        {/* Popular Movies */}
        <div
          ref={el => contentSectionsRef.current[2] = el}
          className="opacity-0"
        >
          <ContentRow
            title="Popular Movies"
            content={popularContent.filter(item => item.type === 'movie')}
          />
        </div>

        {/* New Releases */}
        <div
          ref={el => contentSectionsRef.current[3] = el}
          className="opacity-0"
        >
          <ContentRow
            title="New Releases"
            content={newReleases}
          />
        </div>

        {/* Top Rated */}
        <div
          ref={el => contentSectionsRef.current[4] = el}
          className="opacity-0"
        >
          <ContentRow
            title="Top Rated"
            content={topRated}
          />
        </div>

        {/* Popular Series */}
        <div
          ref={el => contentSectionsRef.current[5] = el}
          className="opacity-0"
        >
          <ContentRow
            title="Popular Series"
            content={popularContent.filter(item => item.type === 'series')}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;