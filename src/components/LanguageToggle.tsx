import React, { useState } from "react";
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
import { useLocation } from "wouter";

interface LanguageToggleProps {
  isMobileView?: boolean;
  instanceId?: string;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const LanguageToggle = ({ isMobileView = false, instanceId = 'default' }: LanguageToggleProps) => {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [, setLocation] = useLocation();
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
      flag: <img src="/images/us.png" alt="US flag" className="w-4 h-3 object-cover rounded-sm" />,
      icon: <Globe className="h-3 w-3" />,
      color: "from-blue-500 to-red-500",
      gradient: "bg-gradient-to-br from-blue-500/20 via-white/30 to-red-500/20"
    },
    {
      code: "ar",
      name: "العربية",
      flag: <img src="/images/arabic.png" alt="Arabic flag" className="w-4 h-3 object-cover rounded-sm" />,
      icon: <Globe className="h-3 w-3" />,
      color: "from-green-600 to-white",
      gradient: "bg-gradient-to-br from-green-600/20 via-white/30 to-green-600/20"
    },
    {
      code: "ckb",
      name: "کوردی",
      flag: <img src="/images/kurd.png" alt="Kurdish flag" className="w-4 h-3 object-cover rounded-sm" />,
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

    // Update URL with new language prefix
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    const SUPPORTED_LANGS = ["en", "ar", "ckb"];

    let newPath;
    if (pathParts.length > 0 && SUPPORTED_LANGS.includes(pathParts[0])) {
      pathParts[0] = languageCode;
      newPath = '/' + pathParts.join('/');
    } else {
      newPath = '/' + languageCode + (currentPath === '/' ? '' : currentPath);
    }

    // Preserve hash if present
    if (window.location.hash) {
      newPath += window.location.hash;
    }

    setLocation(newPath);
    localStorage.setItem("kj-language", languageCode);

    // Reset animation state
    setTimeout(() => setIsChanging(false), 400);
  };


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
            transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" } }}
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
              background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.4), transparent 70%)',
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
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl
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
                    ? `${language.gradient} shadow-xl border-2 border-primary/40`
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