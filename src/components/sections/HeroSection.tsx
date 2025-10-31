"use client";

import { Button } from "../ui/button";
import { Mail, GraduationCap, ArrowDown, TrendingUp, BarChart3, PieChart, LineChart, Play, Star, Users, Award, CheckCircle2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollAnimated, StaggerContainer, FloatingElement, AnimatedSection } from "../AnimatedSection";
import { useEffect, useState } from "react";
import { AnimatedCounter } from "../AnimatedCounter";

export function HeroSection() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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

  const stats = [
    { icon: Users, value: 1000, suffix: "+", label: "Active Students" },
    { icon: Award, value: 95, suffix: "%", label: "Success Rate" },
    { icon: Star, value: 5, suffix: "+", label: "Years Experience" },
    { icon: CheckCircle2, value: 50, suffix: "+", label: "Courses Completed" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-black pt-20"
    >
      {/* Simplified animated background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y1, opacity }}
      >
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Interactive gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15), transparent 50%)`
          }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute top-1/4 right-20 text-blue-500/20 dark:text-blue-400/20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <TrendingUp size={80} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-20 text-purple-500/20 dark:text-purple-400/20"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <BarChart3 size={60} />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                #1 Trading Education Platform
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white leading-tight block">
                {t("hero.title")}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 leading-tight block mt-2">
                {t("hero.subtitle")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-500 dark:text-gray-400 mb-8"
            >
              {t("hero.tagline")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleScrollToSection("#contact")}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t("get_in_touch")}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setIsVideoModalOpen(true)}
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 px-8 py-6 text-lg rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Free Trial Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Cancel Anytime</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Section - Credentials Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-xl">
            <p className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
              {t("hero.credentials")}
            </p>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center items-center gap-4 mt-12"
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
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-all shadow-lg hover:shadow-xl"
              style={{
                backgroundColor: `${social.color}00`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = social.color;
                e.currentTarget.style.borderColor = social.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.borderColor = '';
              }}
            >
              <i className={`${social.icon} text-xl`} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            onClick={() => handleScrollToSection("#about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 rounded-2xl overflow-hidden max-w-5xl w-full shadow-2xl"
          >
            <div className="aspect-video bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/sqOZPnUwSNE?start=3&autoplay=1"
                title="KJ Trading Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-4 flex justify-between items-center bg-gray-900">
              <p className="text-white/80 text-sm">KJ Financial Expert - Demo Video</p>
              <Button onClick={() => setIsVideoModalOpen(false)} variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Font Awesome Icons CDN */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
    </section>
  );
}