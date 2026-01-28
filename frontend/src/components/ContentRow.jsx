import { useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ContentCard from './ContentCard';

const ContentRow = ({ title, content = [], showProgress = false }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 320; // Width of card + gap
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className="relative group">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        {/* Content Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item, index) => (
            <div
              key={item._id || index}
              className="flex-shrink-0 animate-fadeInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ContentCard 
                content={item} 
                showProgress={showProgress}
                progress={item.progress}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRow;