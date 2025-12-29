import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Sparkles, Zap, Star, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollProgressBar } from "./ScrollProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { Link, useLocation } from "wouter";

const navItems = [
  { key: "home", href: "#home", icon: <Star className="w-4 h-4" />, isRoute: false },
  { key: "about", href: "#about", icon: <Sparkles className="w-4 h-4" />, isRoute: false },
  { key: "trade", href: "#trade", icon: <TrendingUp className="w-4 h-4" />, isRoute: false },
  { key: "courses", href: "#courses", icon: <Zap className="w-4 h-4" />, isRoute: false },
  { key: "social", href: "#social", icon: <Star className="w-4 h-4" />, isRoute: false },
  { key: "projects", href: "#projects", icon: <Sparkles className="w-4 h-4" />, isRoute: false },
  { key: "partnership", href: "#partnership", icon: <Zap className="w-4 h-4" />, isRoute: false },
  { key: "contact", href: "#contact", icon: <Star className="w-4 h-4" />, isRoute: false },
];

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].key);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle hash on initial load
  useEffect(() => {
    if (window.location.hash && location === "/") {
      const hash = window.location.hash;
      setTimeout(() => {
        scrollToSection(hash);
      }, 500);
    }
  }, [location]);

  const scrollToSection = (href: string) => {
    setIsOpen(false);

    // If we are not on the home page, navigate to home with hash
    const langPrefix = `/${i18n.language}`;
    if (location !== langPrefix) {
      window.location.href = langPrefix + href;
      return;
    }

    // Small delay to allow the menu to start closing
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Height of the fixed header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <>
      <ScrollProgressBar />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled
          ? "nav-light backdrop-blur-xl bg-white/90 dark:bg-black/30 shadow-2xl border-b border-primary/20 dark:border-gold/30"
          : "bg-transparent"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <motion.div className="flex-shrink-0">
              <motion.a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("#home");
                }}
                className="group relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src="/images/KJM_logo.jpg"
                  alt="KJ Company Logo"
                  className="h-12 w-auto rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/20"
                  // @ts-ignore
                  fetchpriority="high"
                  decoding="async"
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -2, 2, 0]
                  }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-lg opacity-0 group-hover:opacity-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.a>
            </motion.div>

            {/* Enhanced Modern Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center">
                <div className="relative flex items-center space-x-1 p-2 rounded-2xl backdrop-blur-sm bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10">
                  {navItems.map((item, index) => {
                    const isActive = item.isRoute ? location === item.href : activeSection === item.key;
                    const navContent = (
                      <>
                        <motion.span
                          animate={{
                            rotate: isActive ? 360 : 0,
                            scale: isActive ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.icon}
                        </motion.span>

                        <span className="relative z-10">
                          {t(item.key.charAt(0).toUpperCase() + item.key.slice(1))}
                        </span>

                        {!isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"
                          />
                        )}

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white rounded-full shadow-lg"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              style={{ transform: "translateX(-50%)" }}
                            />
                          )}
                        </AnimatePresence>
                      </>
                    );

                    return (
                      <motion.div key={item.key} className="relative">
                        {item.isRoute ? (
                          <Link href={item.href}>
                            <motion.a
                              className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${isActive
                                ? "text-white bg-primary shadow-lg"
                                : "text-slate-700 dark:text-foreground/80 hover:text-slate-900 dark:hover:text-white"
                                }`}
                              whileHover={{
                                scale: 1.05,
                                y: -2
                              }}
                              whileTap={{ scale: 0.95 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {navContent}
                            </motion.a>
                          </Link>
                        ) : (
                          <motion.a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.href);
                            }}
                            className={`group relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                              ? "text-white bg-primary shadow-lg"
                              : "text-slate-700 dark:text-foreground/80 hover:text-slate-900 dark:hover:text-white"
                              }`}
                            whileHover={{
                              scale: 1.05,
                              y: -2
                            }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {navContent}
                          </motion.a>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Language & Theme Toggles */}
            <div className="hidden lg:block">
              <motion.div
                className="flex items-center space-x-2 p-2 rounded-lg backdrop-blur-md bg-gradient-to-r from-white/20 via-white/30 to-white/20 dark:from-white/5 dark:via-white/10 dark:to-white/5 border border-white/30 dark:border-white/20 shadow-md relative overflow-hidden group"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  borderColor: "rgba(48, 79, 255, 0.4)"
                }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ rotate: { duration: 0.3 } }}
                >
                  <LanguageToggle instanceId="navigation" />
                </motion.div>

                <motion.div
                  className="relative z-10 w-px h-6 bg-gradient-to-b from-transparent via-primary/60 to-transparent"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scaleY: [0.6, 1.4, 0.6]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />

                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ rotate: { duration: 0.3 } }}
                >
                  <ThemeToggle instanceId="navigation" />
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Mobile Menu Button - Simplified */}
            <div className="md:hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative w-12 h-12 p-0 rounded-xl bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 hover:bg-white/30 dark:hover:bg-white/15"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isOpen ? "close" : "open"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? (
                        <X className="h-6 w-6" />
                      ) : (
                        <Menu className="h-6 w-6" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop for click-outside */}
                <motion.div
                  className="fixed top-[80px] left-0 w-full h-[100dvh] bg-black/20 backdrop-blur-sm z-[40] md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />

                <motion.div
                  className="md:hidden absolute top-full left-0 right-0 z-[50] overflow-hidden m-4 rounded-3xl"
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className="backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden"
                  >
                    {/* Decorative background gradients */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="px-4 py-6 space-y-2 relative z-10">
                      {navItems.map((item, index) => {
                        const isActive = item.isRoute ? location === item.href : activeSection === item.key;
                        const mobileNavContent = (
                          <>
                            <div className={`p-2 rounded-xl transition-colors duration-300 ${isActive ? 'bg-white/20' : 'bg-gray-100/50 dark:bg-gray-800/50 group-hover:bg-primary/10'}`}>
                              <motion.span
                                animate={{
                                  rotate: isActive ? 360 : 0,
                                  scale: isActive ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                                className={isActive ? 'text-white' : 'text-primary'}
                              >
                                {item.icon}
                              </motion.span>
                            </div>

                            <span className="font-semibold tracking-wide">
                              {t(item.key.charAt(0).toUpperCase() + item.key.slice(1))}
                            </span>

                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  className="ml-auto flex items-center gap-2"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                >
                                  <span className="text-xs font-medium uppercase tracking-wider opacity-80">Active</span>
                                  <div className="w-2 h-2 bg-white rounded-full shadow-lg animate-pulse" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        );

                        const itemClasses = `group flex items-center gap-4 px-4 py-3 rounded-2xl text-base transition-all duration-300 cursor-pointer relative overflow-hidden ${isActive
                          ? "text-white bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-primary/25"
                          : "text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50"
                          }`;

                        return item.isRoute ? (
                          <Link key={item.key} href={item.href}>
                            <motion.a
                              onClick={() => setIsOpen(false)}
                              className={itemClasses}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {mobileNavContent}
                            </motion.a>
                          </Link>
                        ) : (
                          <motion.a
                            key={item.key}
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              scrollToSection(item.href);
                            }}
                            className={itemClasses}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {mobileNavContent}
                          </motion.a>
                        );
                      })}
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;