import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Clock, ChevronLeft, ChevronRight, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  url: string;
}

interface FreeCoursModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const videos: Video[] = [
  {
    id: "tQ1XFQL4rbo",
    title: "Trading Platform Setup",
    duration: "17:55",
    thumbnail: "https://img.youtube.com/vi/tQ1XFQL4rbo/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=tQ1XFQL4rbo"
  },
  {
    id: "TIWGCdwoCXA",
    title: "Candlestick Pattern Analysis",
    duration: "20:12",
    thumbnail: "https://img.youtube.com/vi/TIWGCdwoCXA/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=TIWGCdwoCXA"
  },
  {
    id: "3y9sJKycNGw",
    title: "Moving Averages Strategy",
    duration: "14:25",
    thumbnail: "https://img.youtube.com/vi/3y9sJKycNGw/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=3y9sJKycNGw"
  },
  {
    id: "cGsLjMrJEqY",
    title: "Support and Resistance Levels",
    duration: "16:30",
    thumbnail: "https://img.youtube.com/vi/cGsLjMrJEqY/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=cGsLjMrJEqY"
  },
  {
    id: "2YBW4UHPXHc",
    title: "Chart Pattern Recognition",
    duration: "19:48",
    thumbnail: "https://img.youtube.com/vi/2YBW4UHPXHc/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=2YBW4UHPXHc"
  },
  {
    id: "xclk2s0mQT0",
    title: "Technical Analysis Basics",
    duration: "22:15",
    thumbnail: "https://img.youtube.com/vi/xclk2s0mQT0/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=xclk2s0mQT0"
  },
  {
    id: "Al8bWQA5qBQ",
    title: "Risk Management Strategies",
    duration: "18:20",
    thumbnail: "https://img.youtube.com/vi/Al8bWQA5qBQ/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Al8bWQA5qBQ"
  },
  {
    id: "hDGHjihV7_o",
    title: "Understanding Market Psychology",
    duration: "15:32",
    thumbnail: "https://img.youtube.com/vi/hDGHjihV7_o/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=hDGHjihV7_o"
  },
  {
    id: "-DEdKOEwb94",
    title: "Trading Fundamentals - Introduction",
    duration: "12:45",
    thumbnail: "https://img.youtube.com/vi/-DEdKOEwb94/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=-DEdKOEwb94"
  },
  {
    id: "Zpia6H6OuAo",
    title: "Building Your First Trading Plan",
    duration: "24:30",
    thumbnail: "https://img.youtube.com/vi/Zpia6H6OuAo/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Zpia6H6OuAo"
  },
  {
    id: "sqOZPnUwSNE",
    title: "Market Timing Strategies",
    duration: "21:08",
    thumbnail: "https://img.youtube.com/vi/sqOZPnUwSNE/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=sqOZPnUwSNE"
  },
  {
    id: "6XPTJh-pwUI",
    title: "Money Management Principles",
    duration: "13:40",
    thumbnail: "https://img.youtube.com/vi/6XPTJh-pwUI/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=6XPTJh-pwUI"
  }
];

export function FreeCoursModal({ isOpen, onClose }: FreeCoursModalProps) {
  const { t } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);

  const currentVideo = videos[currentVideoIndex];

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleVideoSelect = (index: number) => {
    if (index !== currentVideoIndex) {
      setIsVideoLoading(true);
    }
    setCurrentVideoIndex(index);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setIsVideoLoading(true);
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setIsVideoLoading(true);
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    }
  };

  const getTotalDuration = () => {
    return "4h 32m"; // Calculated total duration
  };

  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1&origin=${window.location.origin}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-2 sm:inset-4 md:inset-8 lg:inset-12 xl:inset-16 bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800">
              <div className="min-w-0 flex-1 mr-4">
                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent truncate"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {t("free_trading_course")}
                </motion.h2>
                <motion.p
                  className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-1 truncate"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {videos.length} {t("videos")} • {getTotalDuration()}
                </motion.p>
              </div>

              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors duration-200 flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
              </motion.button>
            </div>

            {/* Content Container */}
            <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
              {/* Video Player Section - Fixed height on mobile, flexible on desktop */}
              <div className="flex-none lg:flex-1 flex flex-col min-h-0 bg-black overflow-hidden">
                {/* Video Player Container */}
                <motion.div
                  className="relative w-full aspect-video lg:aspect-auto lg:flex-1 bg-black overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {isPlaying ? (
                    <div className="relative w-full h-full">
                      {isVideoLoading && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900">
                          <img
                            src={currentVideo.thumbnail}
                            alt="Loading..."
                            className="absolute inset-0 w-full h-full object-cover opacity-20 blur-md"
                          />
                          <div className="relative z-20 flex flex-col items-center px-4 text-center">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mb-3"></div>
                            <p className="text-white/70 text-[10px] sm:text-sm font-medium animate-pulse">Loading Lesson {currentVideoIndex + 1}...</p>
                          </div>
                        </div>
                      )}
                      <iframe
                        src={getEmbedUrl(currentVideo.id)}
                        className={`w-full h-full transition-opacity duration-700 ${isVideoLoading ? 'opacity-0' : 'opacity-100'}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onLoad={() => setIsVideoLoading(false)}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-full bg-cover bg-center cursor-pointer relative group"
                      style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}
                      onClick={() => setIsPlaying(true)}
                    >
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bg-white/10 backdrop-blur-md rounded-full p-3 sm:p-6 border border-white/20 group-hover:bg-white/20 transition-colors duration-300">
                          <Play className="w-8 h-8 sm:w-16 sm:h-16 text-white ml-1" fill="currentColor" />
                        </div>
                      </motion.div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-0.5">Up Next</p>
                        <h3 className="text-xs sm:text-lg font-bold line-clamp-1">{currentVideo.title}</h3>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Video Info & Controls - Compact on mobile */}
                <motion.div
                  className="p-3 sm:p-6 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-0.5 line-clamp-1">
                        {t("lesson")} {currentVideoIndex + 1}: {currentVideo.title}
                      </h3>
                      <div className="flex items-center gap-3 text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{currentVideo.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Youtube className="w-3 h-3 mr-1" />
                          <span>HD Quality</span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                      <motion.button
                        onClick={handlePrevious}
                        disabled={currentVideoIndex === 0}
                        className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold transition-all duration-200 ${currentVideoIndex === 0
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        whileHover={currentVideoIndex !== 0 ? { scale: 1.05 } : {}}
                        whileTap={currentVideoIndex !== 0 ? { scale: 0.95 } : {}}
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        <span className="hidden xs:inline">{t("previous")}</span>
                      </motion.button>

                      <div className="text-[10px] sm:text-sm font-mono font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50 px-2 py-1.5 rounded-lg">
                        {currentVideoIndex + 1} / {videos.length}
                      </div>

                      <motion.button
                        onClick={handleNext}
                        disabled={currentVideoIndex === videos.length - 1}
                        className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-sm font-bold transition-all duration-200 ${currentVideoIndex === videos.length - 1
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20'
                          }`}
                        whileHover={currentVideoIndex !== videos.length - 1 ? { scale: 1.05 } : {}}
                        whileTap={currentVideoIndex !== videos.length - 1 ? { scale: 0.95 } : {}}
                      >
                        <span className="hidden xs:inline">{t("next")}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Playlist Sidebar - Scrollable on mobile below video */}
              <motion.div
                className="flex-1 lg:flex-none w-full lg:w-80 xl:w-96 bg-gray-50 dark:bg-gray-800/50 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 flex flex-col min-h-0 overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm flex-none">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white flex items-center gap-2">
                    <Play className="w-3.5 h-3.5 text-green-500" fill="currentColor" />
                    {t("course_playlist")}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {videos.length} {t("lessons")} • {getTotalDuration()}
                  </p>
                </div>

                {/* Video List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className={`p-3 sm:p-4 cursor-pointer border-b border-gray-100 dark:border-gray-800/50 transition-all duration-200 ${index === currentVideoIndex
                        ? 'bg-green-500/10 dark:bg-green-500/5 border-l-4 border-green-500'
                        : 'hover:bg-white dark:hover:bg-gray-800'
                        }`}
                      onClick={() => handleVideoSelect(index)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0 w-16 sm:w-24 aspect-video rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${index === currentVideoIndex ? 'bg-green-500/40 opacity-100' : 'bg-black/20 opacity-0 group-hover:opacity-100'}`}>
                            <Play className="w-4 h-4 text-white" fill="currentColor" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className={`text-[11px] sm:text-sm font-bold mb-0.5 sm:mb-1 line-clamp-2 leading-tight ${index === currentVideoIndex
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-900 dark:text-white'
                            }`}>
                            {index + 1}. {video.title}
                          </h4>
                          <div className="flex items-center text-[9px] sm:text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-2.5 h-2.5 mr-1" />
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}