import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const MobileFixedToggles = () => {
  const [screenSize, setScreenSize] = useState("desktop");
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setScreenSize("desktop");
      } else {
        setScreenSize("mobile");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-hide/show on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      
      if (Math.abs(scrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }
      
      // Show when scrolling up or at top, hide when scrolling down
      setIsVisible(scrollY < lastScrollY || scrollY < 100);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    const onScroll = () => requestTick();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted || screenSize !== "mobile") return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-white/40 dark:border-white/20 shadow-2xl"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Decorative gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
              animate={{ 
                background: [
                  "linear-gradient(90deg, rgba(48,79,255,0.05) 0%, rgba(147,51,234,0.05) 50%, rgba(59,130,246,0.05) 100%)",
                  "linear-gradient(90deg, rgba(59,130,246,0.05) 0%, rgba(48,79,255,0.05) 50%, rgba(147,51,234,0.05) 100%)",
                  "linear-gradient(90deg, rgba(147,51,234,0.05) 0%, rgba(59,130,246,0.05) 50%, rgba(48,79,255,0.05) 100%)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Language Toggle */}
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <LanguageToggle />
            </motion.div>

            {/* Animated Separator */}
            <motion.div
              className="relative z-10 w-px h-8 bg-gradient-to-b from-transparent via-primary/40 to-transparent"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scaleY: [0.8, 1.2, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Theme Toggle */}
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThemeToggle />
            </motion.div>

            {/* Floating particles effect */}
            <motion.div
              className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0 }}
            />
            
            <motion.div
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-br from-blue-500/30 to-primary/30 rounded-full blur-sm"
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, -180, -360]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            />
          </motion.div>

          {/* Pulse ring indicator */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/20 pointer-events-none"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileFixedToggles;