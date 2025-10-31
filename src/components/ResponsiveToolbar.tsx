import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Palette, Globe, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";

const ResponsiveToolbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [screenSize, setScreenSize] = useState("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize("desktop");
        setIsCollapsed(true); // Desktop doesn't use floating toolbar
      } else if (width >= 768) {
        setScreenSize("tablet");
        setIsCollapsed(true); // Tablet shows enhanced panel
      } else if (width >= 480) {
        setScreenSize("mobile");
        setIsCollapsed(true); // Mobile shows slide-out panel
      } else {
        setScreenSize("small-mobile");
        setIsCollapsed(true); // Small mobile shows compact panel
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!mounted) return null;

  // Desktop view - no floating toolbar needed (handled in Navigation)
  if (screenSize === "desktop") {
    return null;
  }

  // Tablet Toolbar (768px to 1023px) - Enhanced slide-out panel from center-right (fixed position)
  if (screenSize === "tablet") {
    return (
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50 flex items-center gap-4">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              className="min-w-[280px] p-6 rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border border-white/40 dark:border-white/20 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Settings className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Settings</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Customize your experience</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(true)}
                  className="w-8 h-8 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Controls */}
              <div className="space-y-4">
                <motion.div
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/30 dark:border-blue-700/30"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Language</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Choose your language</p>
                    </div>
                  </div>
                  <div className="relative z-[60]">
                    <LanguageToggle instanceId="toolbar-tablet" />
                  </div>
                </motion.div>
                
                <motion.div
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/30 dark:border-purple-700/30"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-white">Theme</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Light or dark mode</p>
                    </div>
                  </div>
                  <div className="relative z-[60]">
                    <ThemeToggle instanceId="toolbar-tablet" />
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-sm"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-blue-500/30 to-primary/30 rounded-full blur-sm"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Button - Fixed at center-right */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-14 h-14 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/95 to-white/80 dark:from-gray-800/90 dark:via-gray-900/95 dark:to-gray-800/80 shadow-xl border-2 border-white/60 dark:border-gray-700/60 flex items-center justify-center relative overflow-hidden group"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            borderColor: "rgba(48, 79, 255, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <motion.div
            className="relative z-10"
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-primary" />
          </motion.div>

          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-primary/20"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.button>
      </div>
    );
  }

  // Mobile Toolbar (480px to 767px) - Slide-out panel from right edge
  if (screenSize === "mobile") {
    return (
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
        <AnimatePresence>
          {!isCollapsed && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCollapsed(true)}
              />
              
              {/* Side Panel */}
              <motion.div
                className="fixed right-0 top-0 h-full w-80 max-w-[85vw] backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-l border-white/40 dark:border-white/20 shadow-2xl z-50 p-6 overflow-y-auto"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Sparkles className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Customize KJ Financial</p>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCollapsed(true)}
                    className="w-10 h-10 p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Controls Section */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                  >
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Language Selection
                    </h3>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">Choose Language</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Select your preferred language</p>
                        </div>
                        <LanguageToggle instanceId="toolbar-mobile" />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                  >
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Theme Preference
                    </h3>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">Appearance</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Light, dark, or auto mode</p>
                        </div>
                        <ThemeToggle instanceId="toolbar-mobile" />
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Footer */}
                <motion.div
                  className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                    🎯 KJ Financial Expert Platform
                  </p>
                </motion.div>
                
                {/* Floating decorations */}
                <motion.div
                  className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Trigger - Positioned on right edge */}
        <motion.button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-12 h-20 rounded-l-2xl backdrop-blur-xl bg-gradient-to-b from-white/90 via-white/95 to-white/80 dark:from-gray-800/90 dark:via-gray-900/95 dark:to-gray-800/80 shadow-xl border-l-2 border-t-2 border-b-2 border-white/60 dark:border-gray-700/60 flex flex-col items-center justify-center relative overflow-hidden group"
          whileHover={{ 
            x: -8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          <motion.div
            className="relative z-10 flex flex-col items-center gap-1"
            animate={{ x: isCollapsed ? 0 : -2 }}
            transition={{ duration: 0.3 }}
          >
            <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-primary" />
            <motion.div
              className="w-1 h-6 rounded-full bg-gradient-to-b from-primary/40 to-purple-500/40"
              animate={{ 
                scaleY: [0.5, 1, 0.5],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Slide indicator */}
          <motion.div
            className="absolute left-0 top-1/2 w-1 h-8 bg-primary/60 rounded-r-full transform -translate-y-1/2"
            animate={{ 
              scaleX: isCollapsed ? 0 : 1,
              opacity: isCollapsed ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Hover gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-primary/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-l-2xl"
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    );
  }

  // Small Mobile - Use fixed toggles component instead of toolbar
  if (screenSize === "small-mobile") {
    return null; // MobileFixedToggles component handles this
  }

  return null;
};

export default ResponsiveToolbar;