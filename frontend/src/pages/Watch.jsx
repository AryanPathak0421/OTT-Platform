import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { useContent } from '../context/ContentContext';

const Watch = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const { getContentById, addToWatchHistory } = useContent();

  const season = searchParams.get('season');
  const episode = searchParams.get('episode');

  useEffect(() => {
    fetchContent();
  }, [id, season, episode]);

  const fetchContent = async () => {
    setLoading(true);
    const contentData = await getContentById(id);
    if (contentData) {
      setContent(contentData);
      
      // If it's a series and we have season/episode params
      if (contentData.type === 'series' && season && episode) {
        const seasonData = contentData.seasons?.find(s => s.seasonNumber === parseInt(season));
        const episodeData = seasonData?.episodes?.find(e => e.episodeNumber === parseInt(episode));
        setCurrentEpisode(episodeData);
      }
    }
    setLoading(false);
  };

  const handleProgress = (progress) => {
    if (content) {
      addToWatchHistory(content._id, progress, false);
    }
  };

  const handleComplete = () => {
    if (content) {
      addToWatchHistory(content._id, 0, true);
    }
  };

  const getVideoUrl = () => {
    if (currentEpisode) {
      return currentEpisode.videoUrl;
    }
    return content?.videoUrl;
  };

  const getTitle = () => {
    if (currentEpisode) {
      return `${content.title} - S${season}E${episode}: ${currentEpisode.title}`;
    }
    return content?.title;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Content not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-red-600 hover:text-red-500"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <VideoPlayer
        src={getVideoUrl()}
        title={getTitle()}
        poster={content.poster}
        onProgress={handleProgress}
        onComplete={handleComplete}
        onBack={() => navigate(-1)}
      />
    </div>
  );
};

export default Watch;