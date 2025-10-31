import React, { useState, useEffect } from "react";
import { Moon, Sun, Monitor, Palette, Stars, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";
import { useDropdown } from "../contexts/DropdownContext";

interface ThemeToggleProps {
  isMobileView?: boolean;
  instanceId?: string;
}

const ThemeToggle = ({ isMobileView = false, instanceId = 'default' }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [particles, setParticles] = useState([]);
  const { openDropdown, setOpenDropdown } = useDropdown();
  
  const dropdownKey = `theme-${instanceId}`;
  const isOpen = openDropdown === dropdownKey;
  const setIsOpen = (open: boolean) => {
    setOpenDropdown(open ? dropdownKey : null);
  };

  const themes = [
    {
      value: "light",
      name: "Light Mode",
      icon: <Sun className="h-4 w-4" />,
      emoji: "☀️",
      color: "from-yellow-400 via-orange-400 to-red-400",
      gradient: "bg-gradient-to-br from-yellow-400/20 via-orange-400/30 to-red-400/20",
      description: "Bright and clean"
    },
    {
      value: "dark",
      name: "Dark Mode", 
      icon: <Moon className="h-4 w-4" />,
      emoji: "🌙",
      color: "from-purple-500 via-blue-600 to-indigo-700",
      gradient: "bg-gradient-to-br from-purple-500/20 via-blue-600/30 to-indigo-700/20",
      description: "Easy on the eyes"
    },
    {
      value: "system",
      name: "Auto Mode",
      icon: <Monitor className="h-4 w-4" />,
      emoji: "💻",
      color: "from-gray-400 via-slate-500 to-gray-600",
      gradient: "bg-gradient-to-br from-gray-400/20 via-slate-500/30 to-gray-600/20",
      description: "Follow system"
    }
  ];

  const getCurrentTheme = () => {
    return themes.find(t => t.value === theme) || themes[2]; // default to system
  };

  const createRipple = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 2
    }));
    
    setParticles(newParticles);
    
    setTimeout(() => {
      setParticles([]);
    }, 3000);
  };

  const handleThemeChange = async (newTheme: string) => {
    if (newTheme === theme) return;
    
    setIsChanging(true);
    setIsOpen(false);
    createParticles();
    
    // Enhanced transition delay with particle effects
    await new Promise(resolve => setTimeout(resolve, 250));
    
    setTheme(newTheme as "light" | "dark" | "system");
    
    // Reset animation state
    setTimeout(() => setIsChanging(false), 500);
  };

  const currentTheme = getCurrentTheme();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={createRipple}
          className={`
            relative ${isMobileView ? 'w-14 h-14' : 'w-10 h-8'} p-0 rounded-xl overflow-hidden
            bg-gradient-to-br from-white/20 via-white/30 to-white/10 
            dark:from-white/10 dark:via-white/15 dark:to-white/5
            backdrop-blur-md border-2 border-white/40 dark:border-white/30
            hover:from-white/30 hover:via-white/40 hover:to-white/20
            dark:hover:from-white/15 dark:hover:via-white/25 dark:hover:to-white/10
            hover:border-primary/50 dark:hover:border-primary/40
            hover:shadow-xl hover:shadow-primary/25
            transition-all duration-300 ease-out
            group ${currentTheme.gradient}
          `}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${currentTheme.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            animate={{ 
              background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              rotate: [0, 360] 
            }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }}}
          />

          {/* Particle Effects */}
          <AnimatePresence>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-current rounded-full opacity-60"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, particle.scale, 0],
                  opacity: [0, 1, 0],
                  y: [0, -20, -40],
                  rotate: [0, 180, 360]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 2,
                  delay: particle.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </AnimatePresence>

          {/* Ripple Effects */}
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                className="absolute rounded-full bg-white/30 dark:bg-white/20 pointer-events-none"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isChanging ? (
                <motion.div
                  key="changing"
                  initial={{ scale: 0.5, opacity: 0, rotate: -360 }}
                  animate={{ 
                    scale: [0.8, 1.3, 1], 
                    opacity: 1, 
                    rotate: [0, 180, 360],
                    filter: [
                      "hue-rotate(0deg) brightness(1)",
                      "hue-rotate(180deg) brightness(1.5)",
                      "hue-rotate(360deg) brightness(1)"
                    ]
                  }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 720 }}
                  transition={{ 
                    duration: 0.8,
                    scale: { type: "spring", stiffness: 200, damping: 15 },
                    filter: { duration: 1.5 }
                  }}
                  className="flex items-center justify-center"
                >
                  <Stars className="h-4 w-4 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="current"
                  initial={{ scale: 0.6, opacity: 0, rotate: -90 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    rotate: 0,
                  }}
                  exit={{ scale: 0.6, opacity: 0, rotate: 90 }}
                  transition={{ 
                    duration: 0.5, 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20 
                  }}
                  className="relative"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  {/* Theme Icons with Advanced Animations */}
                  {theme === "light" && (
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        filter: [
                          "drop-shadow(0 0 0px rgba(255, 193, 7, 0))",
                          "drop-shadow(0 0 10px rgba(255, 193, 7, 0.8))",
                          "drop-shadow(0 0 0px rgba(255, 193, 7, 0))"
                        ]
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        filter: { duration: 3, repeat: Infinity }
                      }}
                    >
                      <Sun className={`${isMobileView ? 'h-6 w-6' : 'h-4 w-4'} text-yellow-500 dark:text-yellow-400`} />
                    </motion.div>
                  )}
                  
                  {theme === "dark" && (
                    <motion.div
                      animate={{ 
                        rotate: [0, -5, 5, 0],
                        filter: [
                          "drop-shadow(0 0 0px rgba(139, 69, 19, 0))",
                          "drop-shadow(0 0 8px rgba(139, 69, 19, 0.6))",
                          "drop-shadow(0 0 0px rgba(139, 69, 19, 0))"
                        ]
                      }}
                      transition={{ 
                        rotate: { duration: 4, repeat: Infinity },
                        filter: { duration: 2.5, repeat: Infinity }
                      }}
                    >
                      <Moon className={`${isMobileView ? 'h-6 w-6' : 'h-4 w-4'} text-blue-400 dark:text-blue-300`} />
                    </motion.div>
                  )}
                  
                  {theme === "system" && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        filter: [
                          "drop-shadow(0 0 0px rgba(100, 116, 139, 0))",
                          "drop-shadow(0 0 6px rgba(100, 116, 139, 0.5))",
                          "drop-shadow(0 0 0px rgba(100, 116, 139, 0))"
                        ]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity 
                      }}
                    >
                      <Monitor className={`${isMobileView ? 'h-6 w-6' : 'h-4 w-4'} text-gray-500 dark:text-gray-400`} />
                    </motion.div>
                  )}


                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, ${currentTheme.color.split(' ')[1]}40, transparent 70%)`,
              filter: "blur(8px)"
            }}
          />

          <span className="sr-only">Toggle theme - Current: {currentTheme.name}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="center"
        side={isMobileView ? "top" : "bottom"}
        alignOffset={0}
        className={`
          ${isMobileView ? 'w-[320px] max-w-[90vw]' : 'min-w-[240px]'} 
          p-3 rounded-3xl border-2 shadow-2xl
          bg-white/99 dark:bg-gray-900/99 backdrop-blur-2xl
          border-primary/20 dark:border-primary/30
          animate-in fade-in-0 zoom-in-95 
          ${isMobileView ? 'slide-in-from-bottom-8' : 'slide-in-from-top-4'}
          duration-300
        `}
        sideOffset={isMobileView ? 20 : 12}
        collisionPadding={isMobileView ? 24 : 10}
        avoidCollisions={true}
      >
        {/* Header */}
        <motion.div 
          className={`px-4 ${isMobileView ? 'py-4' : 'py-2'} mb-3 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center justify-center gap-2 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Palette className={isMobileView ? "h-4 w-4" : "h-3 w-3"} />
          Choose Theme
        </motion.div>

        <div className={isMobileView ? "space-y-2" : ""}>
        {themes.map((themeOption, index) => (
          <motion.div
            key={themeOption.value}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <DropdownMenuItem
              onClick={() => handleThemeChange(themeOption.value)}
              className={`
                flex items-center gap-4 ${isMobileView ? 'p-5 rounded-2xl' : 'p-4 rounded-xl'} cursor-pointer
                transition-all duration-300 ease-out group
                ${theme === themeOption.value 
                  ? `bg-gradient-to-r ${themeOption.color} bg-opacity-20 shadow-xl border-2 border-primary/40` 
                  : 'hover:bg-gradient-to-r hover:from-primary/8 hover:via-primary/12 hover:to-primary/8 hover:shadow-lg border-2 border-transparent'
                }
                hover:scale-[1.03] active:scale-[0.97]
              `}
            >
              {/* Theme Icon Container */}
              <motion.div 
                className={`
                  flex-shrink-0 ${isMobileView ? 'w-14 h-14' : 'w-10 h-10'} rounded-2xl flex items-center justify-center
                  bg-gradient-to-br ${themeOption.gradient}
                  border-2 border-white/40 dark:border-white/30
                  shadow-xl backdrop-blur-sm relative overflow-hidden
                `}
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, -8, 8, 0],
                  boxShadow: "0 12px 40px rgba(0,0,0,0.25)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 15,
                  rotate: { duration: 0.3 }
                }}
              >
                <motion.span 
                  className={`${isMobileView ? 'text-3xl' : 'text-xl'} filter drop-shadow-md`}
                  animate={theme === themeOption.value ? { 
                    scale: [1, 1.15, 1],
                    rotate: themeOption.value === "light" ? [0, 360] : [0, -10, 10, 0]
                  } : {}}
                  transition={{ 
                    duration: themeOption.value === "light" ? 4 : 2, 
                    repeat: Infinity 
                  }}
                >
                  {themeOption.emoji}
                </motion.span>
                
                {/* Active theme sparkle effect */}
                {theme === themeOption.value && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Sparkles className={`absolute top-1 right-1 ${isMobileView ? 'h-4 w-4' : 'h-3 w-3'} text-primary/70 animate-pulse`} />
                  </motion.div>
                )}
              </motion.div>

              {/* Theme Info */}
              <div className="flex-grow flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-primary/80 group-hover:text-primary transition-colors duration-200"
                >
                  {React.cloneElement(themeOption.icon as React.ReactElement, {
                    className: isMobileView ? "h-5 w-5" : "h-4 w-4"
                  })}
                </motion.div>
                <div>
                  <div className={`font-bold ${isMobileView ? 'text-lg' : 'text-sm'}`}>{themeOption.name}</div>
                  <div className={`${isMobileView ? 'text-sm' : 'text-xs'} opacity-70 font-medium`}>{themeOption.description}</div>
                </div>
              </div>

              {/* Active Indicator */}
              <AnimatePresence>
                {theme === themeOption.value && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 180 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 15,
                      duration: 0.4
                    }}
                    className={`flex-shrink-0 ${isMobileView ? 'w-12 h-12' : 'w-8 h-8'} rounded-full bg-primary/30 backdrop-blur-sm flex items-center justify-center border-2 border-primary/40`}
                  >
                    <motion.span 
                      className={`text-primary font-extrabold ${isMobileView ? 'text-xl' : 'text-sm'}`}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        textShadow: [
                          "0 0 0px rgba(48, 79, 255, 0)",
                          "0 0 15px rgba(48, 79, 255, 0.9)",
                          "0 0 0px rgba(48, 79, 255, 0)"
                        ]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✓
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </DropdownMenuItem>
          </motion.div>
        ))}
        </div>

        {/* Footer tip */}
        {isMobileView && (
          <motion.div 
            className="mt-3 px-4 py-3 text-xs text-gray-500 dark:text-gray-400 italic border-t-2 border-gray-200/50 dark:border-gray-700/50 text-center font-medium bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-b-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            💡 Auto mode follows your system preferences
          </motion.div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;