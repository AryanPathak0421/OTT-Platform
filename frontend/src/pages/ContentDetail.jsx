import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiPlay, 
  FiHeart, 
  FiStar, 
  FiCalendar, 
  FiClock,
  FiUser,
  FiVideo
} from 'react-icons/fi';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import ContentRow from '../components/ContentRow';

const ContentDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarContent, setSimilarContent] = useState([]);
  const { getContentById, addToFavorites, removeFromFavorites, favorites } = useContent();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchContentDetails();
  }, [id]);

  const fetchContentDetails = async () => {
    setLoading(true);
    const contentData = await getContentById(id);
    if (contentData) {
      setContent(contentData);
      // Fetch similar content based on genre
      if (contentData.genre && contentData.genre.length > 0) {
        // This would be a separate API call in a real app
        // For now, we'll skip similar content
      }
    }
    setLoading(false);
  };

  const isFavorite = favorites.some(fav => fav._id === content?._id);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated || !content) return;

    if (isFavorite) {
      await removeFromFavorites(content._id);
    } else {
      await addToFavorites(content._id);
    }
  };

  const formatDuration = (duration) => {
    if (content?.type === 'movie') {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
    return `${duration} seasons`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Content not found</h2>
          <Link to="/" className="text-red-600 hover:text-red-500">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${content.backdrop || content.poster})`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-shrink-0"
              >
                <img
                  src={content.poster}
                  alt={content.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-2xl"
                />
              </motion.div>

              {/* Content Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 max-w-2xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {content.title}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium">
                    {content.type === 'movie' ? 'Movie' : 'Series'}
                  </span>
                  {content.rating?.imdb && (
                    <div className="flex items-center space-x-1">
                      <FiStar className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">
                        {content.rating.imdb}/10
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 text-gray-300">
                    <FiCalendar className="w-4 h-4" />
                    <span>{content.releaseYear}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-300">
                    <FiClock className="w-4 h-4" />
                    <span>{formatDuration(content.duration)}</span>
                  </div>
                </div>

                <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                  {content.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mb-6">
                  <Link
                    to={`/watch/${content._id}`}
                    className="bg-white text-black px-8 py-3 rounded-md font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-colors"
                  >
                    <FiPlay className="w-5 h-5" />
                    <span>Play</span>
                  </Link>
                  
                  {content.trailer && (
                    <a
                      href={content.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-600/80 text-white px-8 py-3 rounded-md font-semibold flex items-center space-x-2 hover:bg-gray-600 transition-colors"
                    >
                      <FiVideo className="w-5 h-5" />
                      <span>Trailer</span>
                    </a>
                  )}

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

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {content.genre?.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-gray-800/60 text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Director:</span>
                    <span className="text-white ml-2">{content.director}</span>
                  </div>
                  {content.producer && (
                    <div>
                      <span className="text-gray-400">Producer:</span>
                      <span className="text-white ml-2">{content.producer}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400">Language:</span>
                    <span className="text-white ml-2">{content.language}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Views:</span>
                    <span className="text-white ml-2">{content.views?.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {content.cast && content.cast.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {content.cast.slice(0, 6).map((actor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-full aspect-[3/4] object-cover rounded-lg mb-2"
                />
                <h3 className="text-white font-medium text-sm">{actor.name}</h3>
                <p className="text-gray-400 text-xs">{actor.character}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Episodes Section for Series */}
      {content.type === 'series' && content.seasons && content.seasons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
          {content.seasons.map((season, seasonIndex) => (
            <div key={seasonIndex} className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Season {season.seasonNumber}
              </h3>
              <div className="space-y-4">
                {season.episodes?.map((episode, episodeIndex) => (
                  <div
                    key={episodeIndex}
                    className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={episode.thumbnail || content.poster}
                        alt={episode.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium">
                        {episode.episodeNumber}. {episode.title}
                      </h4>
                      <p className="text-gray-400 text-sm mt-1">
                        {episode.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{episode.duration} min</span>
                      </div>
                    </div>
                    <Link
                      to={`/watch/${content._id}?season=${season.seasonNumber}&episode=${episode.episodeNumber}`}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                    >
                      <FiPlay className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ContentDetail;