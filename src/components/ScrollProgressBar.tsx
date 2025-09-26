import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setScrollProgress((currentProgress / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary via-blue-500 to-primary dark:from-gold dark:via-blue-500 dark:to-gold transition-all duration-300 ease-out relative scroll-progress-light"
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Enhanced glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary dark:from-gold dark:via-blue-500 dark:to-gold blur-sm"
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(48, 79, 255, 0.8)",
              "0 0 20px rgba(48, 79, 255, 1)",
              "0 0 10px rgba(48, 79, 255, 0.8)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Animated shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: [-100, 300] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}