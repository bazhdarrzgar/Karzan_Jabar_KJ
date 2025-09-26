"use client";

import { Button } from "../ui/button";
import { Mail, GraduationCap, ArrowDown, TrendingUp, BarChart3, PieChart, LineChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollAnimated, StaggerContainer, FloatingElement, AnimatedSection } from "../AnimatedSection";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -150]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Particle data for modern particle system
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-light pt-24 md:pt-32"
    >
      {/* Enhanced Light Mode Background with 3D Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ y: y1, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-gray-900 dark:via-blue-900/30 dark:to-black">
          {/* Interactive gradient based on mouse position - Light Mode Enhanced */}
          <motion.div
            className="absolute inset-0 opacity-20 dark:opacity-30"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, #304FFF15 0%, transparent 50%)`
            }}
          />
          {/* Additional light mode gradients */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/10 dark:from-transparent" />
        </div>
        
        {/* Enhanced Particle System for Light Mode */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-primary/60 dark:bg-gold rounded-full shadow-sm"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, particle.size / 4, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Floating geometric shapes for Light Mode */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 border border-primary/30 dark:border-gold/20 rotate-45 shadow-lg"
            animate={{ 
              rotate: [45, 225, 45],
              scale: [1, 1.2, 1],
              borderColor: ["rgba(48, 79, 255, 0.3)", "rgba(48, 79, 255, 0.5)", "rgba(48, 79, 255, 0.3)"]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-primary/20 to-transparent dark:from-gold/10 rounded-full shadow-xl"
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-primary/40 dark:border-gold/30 rounded-full shadow-lg"
            animate={{ 
              scale: [1, 1.3, 1],
              borderColor: ["rgba(48, 79, 255, 0.4)", "rgba(48, 79, 255, 0.7)", "rgba(48, 79, 255, 0.4)"]
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        {/* Enhanced Financial chart decorative elements for Light Mode */}
        <motion.div
          className="absolute top-1/4 right-10 text-primary/30 dark:text-gold/20"
          style={{ y: y2 }}
        >
          <TrendingUp size={60} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-10 text-primary/25 dark:text-gold/15"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <BarChart3 size={50} />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/3 text-primary/20 dark:text-gold/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <PieChart size={40} />
        </motion.div>
      </motion.div>

      {/* Enhanced Modern Foreground Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Modern glassmorphism card container for Light Mode */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="backdrop-blur-xl bg-white/80 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl card-light"
        >
          {/* Enhanced main heading with modern typography for Light Mode */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.h1 
              className="text-4xl md:text-7xl lg:text-8xl font-bold text-slate-800 dark:text-white mb-12 leading-tight font-heading"
            >
              <motion.span 
                className="block text-gradient-light dark:bg-gradient-to-r dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                {t("hero.title")}
              </motion.span>
              <motion.span 
                className="block gradient-text text-5xl md:text-8xl lg:text-9xl mt-4"
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(48, 79, 255, 0.5)"
                }}
              >
                {t("hero.subtitle")}
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Enhanced description with stunning design */}
          <motion.div
            className="mb-12 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {/* Main Description with Gradient Text */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.7 }}
            >
              <motion.h2 
                className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent leading-relaxed"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {t("hero.description")}
              </motion.h2>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-800/10 rounded-2xl blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Tagline with modern styling */}
            <motion.p 
              className="text-lg md:text-xl text-slate-600 dark:text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              {t("hero.tagline")}
            </motion.p>

            {/* Original Style Stats Badges */}
            <motion.div
              className="flex items-center justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 bg-primary/20 dark:bg-gold/20 backdrop-blur px-4 py-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-primary dark:text-gold" />
                <span className="text-primary dark:text-gold font-semibold">Expert Analysis</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/20 dark:bg-gold/20 backdrop-blur px-4 py-2 rounded-full">
                <BarChart3 className="w-5 h-5 text-primary dark:text-gold" />
                <span className="text-primary dark:text-gold font-semibold">5+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 bg-primary/20 dark:bg-gold/20 backdrop-blur px-4 py-2 rounded-full">
                <LineChart className="w-5 h-5 text-primary dark:text-gold" />
                <span className="text-primary dark:text-gold font-semibold">1000+ Students</span>
              </div>
            </motion.div>

            {/* Credentials Banner */}
            <motion.div
              className="relative max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-3xl blur opacity-30"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 rounded-3xl px-8 py-6">
                <motion.p 
                  className="text-lg md:text-xl font-semibold text-center bg-gradient-to-r from-gray-700 via-blue-600 to-gray-700 dark:from-gray-200 dark:via-blue-400 dark:to-gray-200 bg-clip-text text-transparent leading-relaxed"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {t("hero.credentials")}
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Modern Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-gold via-blue-500 to-gold rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-300"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <Button
              onClick={() => handleScrollToSection("#contact")}
              className="relative button-modern bg-gradient-to-r from-primary to-primary hover:from-blue-500 hover:to-primary dark:from-gold dark:to-gold dark:hover:from-blue-500 dark:hover:to-gold text-white hover:text-white dark:text-black dark:hover:text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transition-all duration-500 border-0"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 3 }}
              >
                <Mail className="mr-3 h-6 w-6" />
              </motion.div>
              {t("get_in_touch")}
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ 
              scale: 1.05,
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              onClick={() => handleScrollToSection("#courses")}
              className="bg-white/20 dark:bg-white/10 backdrop-blur-md border-2 border-primary/60 dark:border-gold/50 hover:border-primary dark:hover:border-gold text-slate-700 dark:text-white hover:bg-primary/20 dark:hover:bg-gold/20 px-12 py-6 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <GraduationCap className="mr-3 h-6 w-6" />
              {t("view_courses")}
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced social links with modern design */}
        <motion.div
          className="flex justify-center items-center gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
        >
          {[
            { icon: "fab fa-youtube", href: "#", color: "#FF0000" },
            { icon: "fab fa-instagram", href: "#", color: "#E4405F" },
            { icon: "fab fa-telegram", href: "#", color: "#0088cc" },
            { icon: "fab fa-facebook", href: "#", color: "#1877F2" },
            { icon: "fab fa-linkedin", href: "#", color: "#0A66C2" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              className="group relative flex items-center justify-center w-16 h-16 bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 rounded-2xl text-slate-600 dark:text-white hover:text-white transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.2,
                y: -10,
                backgroundColor: social.color + "20",
                borderColor: social.color + "50"
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 + index * 0.1, duration: 0.3 }}
            >
              <motion.i 
                className={`${social.icon} text-2xl`}
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  color: social.color
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  background: `linear-gradient(45deg, ${social.color}30, transparent)`
                }}
              />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Font Awesome Icons CDN */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
    </section>
  );
}