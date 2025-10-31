import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Languages, Globe, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropdown } from "../contexts/DropdownContext";

interface LanguageToggleProps {
  isMobileView?: boolean;
  instanceId?: string;
}

const LanguageToggle = ({ isMobileView = false, instanceId = 'default' }: LanguageToggleProps) => {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);
  const [ripples, setRipples] = useState([]);
  const { openDropdown, setOpenDropdown } = useDropdown();
  
  const dropdownKey = `language-${instanceId}`;
  const isOpen = openDropdown === dropdownKey;
  const setIsOpen = (open: boolean) => {
    setOpenDropdown(open ? dropdownKey : null);
  };

  const languages = [
    { 
      code: "en", 
      name: "English", 
      flag: "🇺🇸",
      icon: <Globe className="h-3 w-3" />,
      color: "from-blue-500 to-red-500",
      gradient: "bg-gradient-to-br from-blue-500/20 via-white/30 to-red-500/20"
    },
    { 
      code: "ar", 
      name: "العربية", 
      flag: "🇸🇦",
      icon: <Globe className="h-3 w-3" />,
      color: "from-green-600 to-white",
      gradient: "bg-gradient-to-br from-green-600/20 via-white/30 to-green-600/20"
    },
    { 
      code: "ckb", 
      name: "کوردی", 
      flag: <img 
        src="data:image/png;base64,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"
        alt="Kurdish flag"
        className="w-4 h-3 object-cover rounded-sm"
      />,
      icon: <Globe className="h-3 w-3" />,
      color: "from-red-600 to-yellow-500",
      gradient: "bg-gradient-to-br from-red-600/20 via-yellow-500/30 to-green-600/20"
    },
  ];

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
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
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const changeLanguage = async (languageCode: string) => {
    if (languageCode === i18n.language) return;
    
    setIsChanging(true);
    setIsOpen(false);
    
    // Add smooth transition delay with enhanced effects
    await new Promise(resolve => setTimeout(resolve, 200));
    
    i18n.changeLanguage(languageCode);
    localStorage.setItem("kj-language", languageCode);
    
    // Reset animation state
    setTimeout(() => setIsChanging(false), 400);
  };

  // Set initial language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("kj-language");
    if (savedLanguage && languages.find(lang => lang.code === savedLanguage)) {
      i18n.changeLanguage(savedLanguage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentLang = getCurrentLanguage();

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
            group ${currentLang.gradient}
          `}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${currentLang.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
            animate={{ 
              background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              rotate: [0, 360] 
            }}
            transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }}}
          />

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
                  initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                  animate={{ 
                    scale: [0.8, 1.2, 1], 
                    opacity: 1, 
                    rotate: 0,
                    filter: ["hue-rotate(0deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"]
                  }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
                  transition={{ 
                    duration: 0.6,
                    scale: { type: "spring", stiffness: 200, damping: 15 },
                    filter: { duration: 1, repeat: Infinity }
                  }}
                  className="flex items-center justify-center"
                >
                  <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                </motion.div>
              ) : (
                <motion.div
                  key="current"
                  initial={{ scale: 0.6, opacity: 0, rotate: -45 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    rotate: 0,
                  }}
                  exit={{ scale: 0.6, opacity: 0, rotate: 45 }}
                  transition={{ 
                    duration: 0.4, 
                    type: "spring", 
                    stiffness: 300,
                    damping: 20 
                  }}
                  className="flex items-center justify-center relative"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Flag/Icon Display */}
                  {typeof currentLang.flag === 'string' ? (
                    <motion.span 
                      className={`${isMobileView ? 'text-2xl' : 'text-lg'} drop-shadow-lg relative`}
                      animate={{ 
                        textShadow: [
                          "0 0 10px rgba(48, 79, 255, 0.3)",
                          "0 0 20px rgba(48, 79, 255, 0.6)",
                          "0 0 10px rgba(48, 79, 255, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentLang.flag}
                    </motion.span>
                  ) : (
                    <motion.div
                      className={isMobileView ? "scale-125" : "scale-100"}
                      animate={{ 
                        filter: [
                          "brightness(1) saturate(1)",
                          "brightness(1.2) saturate(1.3)",
                          "brightness(1) saturate(1)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentLang.flag}
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
              background: `radial-gradient(circle at center, ${currentLang.color.split(' ')[1]}40, transparent 70%)`,
              filter: "blur(8px)"
            }}
          />

          <span className="sr-only">Toggle language - Current: {currentLang.name}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="center"
        side={isMobileView ? "top" : "bottom"}
        alignOffset={0}
        className={`
          ${isMobileView ? 'w-[320px] max-w-[90vw]' : 'min-w-[220px]'} 
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
          <Languages className={isMobileView ? "h-4 w-4" : "h-3 w-3"} />
          Select Language
        </motion.div>

        <div className={isMobileView ? "space-y-2" : ""}>
        {languages.map((language, index) => (
          <motion.div
            key={language.code}
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.08,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <DropdownMenuItem
              onClick={() => changeLanguage(language.code)}
              className={`
                flex items-center gap-4 ${isMobileView ? 'p-5 rounded-2xl' : 'p-4 rounded-xl'} cursor-pointer
                transition-all duration-300 ease-out group
                ${i18n.language === language.code 
                  ? `bg-gradient-to-r ${language.color} bg-opacity-20 shadow-xl border-2 border-primary/40` 
                  : 'hover:bg-gradient-to-r hover:from-primary/8 hover:via-primary/12 hover:to-primary/8 hover:shadow-lg border-2 border-transparent'
                }
                hover:scale-[1.03] active:scale-[0.97]
              `}
            >
              {/* Flag Container */}
              <motion.div 
                className={`
                  flex-shrink-0 ${isMobileView ? 'w-14 h-14' : 'w-10 h-10'} rounded-2xl flex items-center justify-center
                  bg-gradient-to-br ${language.gradient}
                  border-2 border-white/40 dark:border-white/30
                  shadow-xl backdrop-blur-sm
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
                {typeof language.flag === 'string' ? (
                  <span className={`${isMobileView ? 'text-3xl' : 'text-xl'} filter drop-shadow-md`}>{language.flag}</span>
                ) : (
                  <div className={`filter drop-shadow-md ${isMobileView ? 'scale-125' : 'scale-110'}`}>{language.flag}</div>
                )}
              </motion.div>

              {/* Language Info */}
              <div className="flex-grow flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-primary/80 group-hover:text-primary transition-colors duration-200"
                >
                  {React.cloneElement(language.icon as React.ReactElement, {
                    className: isMobileView ? "h-5 w-5" : "h-3 w-3"
                  })}
                </motion.div>
                <div>
                  <div className={`font-bold ${isMobileView ? 'text-lg' : 'text-sm'}`}>{language.name}</div>
                  <div className={`${isMobileView ? 'text-sm' : 'text-xs'} opacity-70 font-medium`}>{language.code.toUpperCase()}</div>
                </div>
              </div>

              {/* Active Indicator */}
              <AnimatePresence>
                {i18n.language === language.code && (
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;