import { TrendingUp, Coins, Users, Award, BarChart, Target, Sparkles, Star, TrendingDown, LineChart, CheckCircle2, Zap, Trophy, BookOpen, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedCounter } from "../AnimatedCounter";
import { motion } from "framer-motion";
import { ScrollAnimated, StaggerContainer, FloatingElement, AnimatedSection } from "../AnimatedSection";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 section-light bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced background decorative elements with floating animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40" intensity={20} duration={8}>
          <div className="w-40 h-40 sm:w-60 md:w-80 sm:h-60 md:h-80 bg-primary/5 dark:bg-gold/5 rounded-full blur-2xl sm:blur-3xl"></div>
        </FloatingElement>
        <FloatingElement className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40" intensity={25} duration={10}>
          <div className="w-40 h-40 sm:w-60 md:w-80 sm:h-60 md:h-80 bg-blue-500/8 dark:bg-blue-500/5 rounded-full blur-2xl sm:blur-3xl"></div>
        </FloatingElement>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 md:w-96 sm:h-72 md:h-96 bg-gradient-to-r from-primary/8 to-blue-500/8 dark:from-gold/5 dark:to-blue-500/5 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        {/* Additional decorative sparkles */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-gold rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced section header with reveal animation */}
        <ScrollAnimated animation="fadeIn" className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            className="inline-block mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 dark:from-primary/20 dark:via-purple-500/20 dark:to-blue-500/20 border border-primary/20 dark:border-primary/30 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-primary dark:text-gold uppercase tracking-wider">About Karzan Jabar</span>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold animate-pulse" />
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 sm:mb-6 md:mb-8 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="gradient-text leading-tight block">{t("about_title")}</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {t("about_paragraph")}
          </motion.p>
        </ScrollAnimated>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Enhanced image section with advanced animations */}
          <ScrollAnimated animation="slideLeft">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Main image with modern styling */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
                <motion.img
                  src="public/images/karzan.jpg"
                  alt={t("about_img_alt")}
                  className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto aspect-[4/5] object-cover transform transition-all duration-700"
                  initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1, ease: "backOut" }}
                  viewport={{ once: true }}
                  whileHover={{
                    rotateY: 2,
                    rotateX: 1
                  }}
                />

                {/* Premium overlay gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 1.1 }}
                  whileHover={{ scale: 1 }}
                />

                {/* Glowing border effect */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-gold/30 via-primary/30 to-blue-500/30 rounded-2xl sm:rounded-3xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10"
                  animate={{
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                {/* Badge overlay */}
                <motion.div
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-white/20"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Expert Trader</p>
                      <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">5+ Years</p>
                    </div>
                  </div>
                </motion.div>

                {/* Stats badge bottom */}
                <motion.div
                  className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <motion.img
                        src="https://i.pravatar.cc/150?img=33"
                        alt="Student 1"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.img
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Student 2"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.img
                        src="https://i.pravatar.cc/150?img=29"
                        alt="Student 3"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.img
                        src="https://i.pravatar.cc/150?img=15"
                        alt="Student 4"
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">1000+ Students</p>
                      <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Worldwide</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </ScrollAnimated>

          {/* Enhanced content section with modern card design */}
          <ScrollAnimated animation="slideRight">
            <StaggerContainer className="space-y-6 sm:space-y-8 md:space-y-10" staggerDelay={0.2}>
              {/* Professional Journey Card */}
              <motion.div
                className="glass-modern card-light p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold/20 via-yellow-500/20 to-gold/20 backdrop-blur-sm flex items-center justify-center border border-gold/30"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="text-gold w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-tight">
                      {t("about_professional_journey_title")}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-gold to-yellow-500 rounded-full"></div>
                      <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                  </div>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("about_professional_journey_paragraph")}
                </p>
              </motion.div>

              {/* Key Achievements Card */}
              <motion.div
                className="glass-effect p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 via-blue-500/20 to-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="text-primary w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-white leading-tight">
                      {t("about_key_achievements_title")}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-primary to-blue-500 rounded-full"></div>
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
                <StaggerContainer className="space-y-3 sm:space-y-4" staggerDelay={0.1}>
                  {[1, 2, 3, 4].map((num) => (
                    <motion.div
                      key={num}
                      className="flex items-start gap-3 sm:gap-4 group p-3 sm:p-4 rounded-xl bg-white/50 dark:bg-gray-800/30 border border-transparent hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-300"
                      whileHover={{ x: 10, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-gold to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{
                          scale: 1.3,
                          rotate: 360,
                          boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)"
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </motion.div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 leading-relaxed flex-1">
                        {t(`about_achievement_${num}`)}
                      </p>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </motion.div>
            </StaggerContainer>
          </ScrollAnimated>
        </div>

        {/* Enhanced Statistics Section with premium card design */}
        <ScrollAnimated animation="fadeIn">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" staggerDelay={0.2}>
            {/* Analysis Experience Card */}
            <motion.div
              className="text-center group glass-effect p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Premium background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold/10 via-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 1 }}
              />

              <div className="relative z-10">
                <div className="relative mb-5 sm:mb-6">
                  <motion.div
                    className="bg-gradient-to-br from-gold via-yellow-500 to-gold rounded-2xl w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center mx-auto shadow-xl"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      boxShadow: "0 0 40px rgba(255, 215, 0, 0.8)"
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <TrendingUp className="text-black w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute -inset-2 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">{t("about_analysis")}</h4>
                <motion.p
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <AnimatedCounter
                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                    end={5}
                    suffix="+"
                  />
                </motion.p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">{t("about_analysis_years")}</p>

                {/* Decorative icon */}
                <motion.div
                  className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <BarChart className="w-12 h-12 sm:w-16 sm:h-16 text-gold" />
                </motion.div>
              </div>
            </motion.div>

            {/* Trading Expertise Card */}
            <motion.div
              className="text-center group glass-effect p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Premium background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 1 }}
              />

              <div className="relative z-10">
                <div className="relative mb-5 sm:mb-6">
                  <motion.div
                    className="bg-gradient-to-br from-navy via-blue-800 to-navy rounded-2xl w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center mx-auto shadow-xl"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      boxShadow: "0 0 40px rgba(30, 41, 59, 0.8)"
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Coins className="text-gold w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute -inset-2 bg-navy/20 rounded-full blur-md opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">{t("about_trading")}</h4>
                <motion.p
                  className="text-base sm:text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-2 px-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {t("about_trading_level")}
                </motion.p>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Professional Level</p>

                {/* Decorative icon */}
                <motion.div
                  className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LineChart className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            {/* Students Count Card */}
            <motion.div
              className="text-center group glass-effect p-6 sm:p-7 md:p-8 rounded-xl sm:rounded-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl relative overflow-hidden sm:col-span-2 lg:col-span-1"
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Premium background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 1 }}
              />

              <div className="relative z-10">
                <div className="relative mb-5 sm:mb-6">
                  <motion.div
                    className="bg-gradient-to-br from-gold via-yellow-500 to-gold rounded-2xl w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center mx-auto shadow-xl"
                    whileHover={{
                      rotate: 360,
                      scale: 1.1,
                      boxShadow: "0 0 40px rgba(255, 215, 0, 0.8)"
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        y: [0, -3, 0]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Users className="text-black w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" />
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="absolute -inset-2 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">{t("about_students")}</h4>
                <motion.p
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  <AnimatedCounter
                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
                    end={1000}
                    suffix="+"
                  />
                </motion.p>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">{t("about_students_count")}</p>

                {/* Decorative icon */}
                <motion.div
                  className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500" />
                </motion.div>
              </div>
            </motion.div>
          </StaggerContainer>
        </ScrollAnimated>
      </div>
    </section>
  );
}