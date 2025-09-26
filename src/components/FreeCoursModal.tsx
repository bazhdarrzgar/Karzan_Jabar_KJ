import React, { useState, useEffect } from "react";
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
    id: "-DEdKOEwb94",
    title: "Trading Fundamentals - Introduction",
    duration: "12:45",
    thumbnail: "https://img.youtube.com/vi/-DEdKOEwb94/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=-DEdKOEwb94"
  },
  {
    id: "hDGHjihV7_o",
    title: "Understanding Market Psychology",
    duration: "15:32",
    thumbnail: "https://img.youtube.com/vi/hDGHjihV7_o/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=hDGHjihV7_o"
  },
  {
    id: "Al8bWQA5qBQ",
    title: "Risk Management Strategies",
    duration: "18:20",
    thumbnail: "https://img.youtube.com/vi/Al8bWQA5qBQ/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Al8bWQA5qBQ"
  },
  {
    id: "xclk2s0mQT0",
    title: "Technical Analysis Basics",
    duration: "22:15",
    thumbnail: "https://img.youtube.com/vi/xclk2s0mQT0/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=xclk2s0mQT0"
  },
  {
    id: "2YBW4UHPXHc",
    title: "Chart Pattern Recognition",
    duration: "19:48",
    thumbnail: "https://img.youtube.com/vi/2YBW4UHPXHc/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=2YBW4UHPXHc"
  },
  {
    id: "cGsLjMrJEqY",
    title: "Support and Resistance Levels",
    duration: "16:30",
    thumbnail: "https://img.youtube.com/vi/cGsLjMrJEqY/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=cGsLjMrJEqY"
  },
  {
    id: "3y9sJKycNGw",
    title: "Moving Averages Strategy",
    duration: "14:25",
    thumbnail: "https://img.youtube.com/vi/3y9sJKycNGw/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=3y9sJKycNGw"
  },
  {
    id: "TIWGCdwoCXA",
    title: "Candlestick Pattern Analysis",
    duration: "20:12",
    thumbnail: "https://img.youtube.com/vi/TIWGCdwoCXA/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=TIWGCdwoCXA"
  },
  {
    id: "tQ1XFQL4rbo",
    title: "Trading Platform Setup",
    duration: "17:55",
    thumbnail: "https://img.youtube.com/vi/tQ1XFQL4rbo/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=tQ1XFQL4rbo"
  },
  {
    id: "6XPTJh-pwUI",
    title: "Money Management Principles",
    duration: "13:40",
    thumbnail: "https://img.youtube.com/vi/6XPTJh-pwUI/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=6XPTJh-pwUI"
  },
  {
    id: "sqOZPnUwSNE",
    title: "Market Timing Strategies",
    duration: "21:08",
    thumbnail: "https://img.youtube.com/vi/sqOZPnUwSNE/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=sqOZPnUwSNE"
  },
  {
    id: "Zpia6H6OuAo",
    title: "Building Your First Trading Plan",
    duration: "24:30",
    thumbnail: "https://img.youtube.com/vi/Zpia6H6OuAo/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=Zpia6H6OuAo"
  }
];

export function FreeCoursModal({ isOpen, onClose }: FreeCoursModalProps) {
  const { t } = useTranslation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    setCurrentVideoIndex(index);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setIsPlaying(true);
    }
  };

  const getTotalDuration = () => {
    return "4h 32m"; // Calculated total duration
  };

  const getEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1`;
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-8 lg:inset-12 xl:inset-16 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800">
              <div>
                <motion.h2 
                  className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {t("free_trading_course")}
                </motion.h2>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mt-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {t("free_course_description")} • {videos.length} {t("videos")} • {getTotalDuration()}
                </motion.p>
              </div>
              
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.1 }}
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row h-full flex-1 overflow-hidden">
              {/* Video Player Section */}
              <div className="flex-1 flex flex-col min-h-0">
                {/* Video Player */}
                <motion.div 
                  className="relative bg-black aspect-video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {isPlaying ? (
                    <iframe
                      src={getEmbedUrl(currentVideo.id)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div 
                      className="w-full h-full bg-cover bg-center cursor-pointer relative group"
                      style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}
                      onClick={() => setIsPlaying(true)}
                    >
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-colors duration-300">
                          <Play className="w-16 h-16 text-white ml-1" fill="currentColor" />
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>

                {/* Video Controls */}
                <motion.div 
                  className="p-6 bg-gray-50 dark:bg-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {t("lesson")} {currentVideoIndex + 1}: {currentVideo.title}
                      </h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{currentVideo.duration}</span>
                        <Youtube className="w-4 h-4 ml-4 mr-1" />
                        <span>{t("video_quality")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={handlePrevious}
                      disabled={currentVideoIndex === 0}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        currentVideoIndex === 0 
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      whileHover={currentVideoIndex !== 0 ? { scale: 1.02 } : {}}
                      whileTap={currentVideoIndex !== 0 ? { scale: 0.98 } : {}}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{t("previous")}</span>
                    </motion.button>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {currentVideoIndex + 1} / {videos.length}
                    </div>

                    <motion.button
                      onClick={handleNext}
                      disabled={currentVideoIndex === videos.length - 1}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        currentVideoIndex === videos.length - 1
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-600 text-white'
                      }`}
                      whileHover={currentVideoIndex !== videos.length - 1 ? { scale: 1.02 } : {}}
                      whileTap={currentVideoIndex !== videos.length - 1 ? { scale: 0.98 } : {}}
                    >
                      <span>{t("next")}</span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Playlist Sidebar */}
              <motion.div 
                className="w-full lg:w-80 xl:w-96 bg-gray-50 dark:bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 flex flex-col max-h-96 lg:max-h-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {t("course_playlist")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {videos.length} {t("lessons")} • {getTotalDuration()} {t("total")}
                  </p>
                </div>

                {/* Video List */}
                <div className="flex-1 overflow-y-auto">
                  {videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className={`p-4 cursor-pointer border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 ${
                        index === currentVideoIndex
                          ? 'bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => handleVideoSelect(index)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-16 h-12 object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center">
                            <Play className="w-4 h-4 text-white" fill="currentColor" />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full mr-2 ${
                              index === currentVideoIndex
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                            }`}>
                              {index + 1}
                            </span>
                          </div>
                          <h4 className={`text-sm font-medium mb-1 line-clamp-2 ${
                            index === currentVideoIndex
                              ? 'text-green-700 dark:text-green-300'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {video.title}
                          </h4>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 mr-1" />
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