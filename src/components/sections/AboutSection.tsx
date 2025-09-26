import { TrendingUp, Coins, Users, Award, BarChart, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedCounter } from "../AnimatedCounter";
import { motion } from "framer-motion";
import { ScrollAnimated, StaggerContainer, FloatingElement, AnimatedSection } from "../AnimatedSection";

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 section-light bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced background decorative elements with floating animations */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement className="absolute -top-40 -right-40" intensity={20} duration={8}>
          <div className="w-80 h-80 bg-primary/5 dark:bg-gold/5 rounded-full blur-3xl"></div>
        </FloatingElement>
        <FloatingElement className="absolute -bottom-40 -left-40" intensity={25} duration={10}>
          <div className="w-80 h-80 bg-blue-500/8 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        </FloatingElement>
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/8 to-blue-500/8 dark:from-gold/5 dark:to-blue-500/5 rounded-full blur-3xl"
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
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced section header with reveal animation */}
        <ScrollAnimated animation="fadeIn" className="text-center mb-20">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold font-heading mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="gradient-text">{t("about_title")}</span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {t("about_paragraph")}
          </motion.p>
        </ScrollAnimated>
        
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
          {/* Enhanced image section with advanced animations */}
          <ScrollAnimated animation="slideLeft">
            <motion.div 
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                alt={t("about_img_alt")}
                className="rounded-3xl shadow-2xl w-full h-auto transform transition-all duration-700"
                initial={{ opacity: 0, scale: 0.8, rotateY: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, ease: "backOut" }}
                viewport={{ once: true }}
                whileHover={{ 
                  rotateY: 5,
                  rotateX: 2
                }}
              />
              {/* Enhanced image overlay effects */}
              <motion.div 
                className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scale: 1.1 }}
                whileHover={{ scale: 1 }}
              />
              <motion.div 
                className="absolute -inset-4 bg-gradient-to-r from-gold/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </ScrollAnimated>
          
          {/* Enhanced content section with stagger animations */}
          <ScrollAnimated animation="slideRight">
            <StaggerContainer className="space-y-10" staggerDelay={0.2}>
              <motion.div 
                className="glass-modern card-light p-8 rounded-2xl"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className="text-gold mr-3 h-8 w-8" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                    {t("about_professional_journey_title")}
                  </h3>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("about_professional_journey_paragraph")}
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-effect p-8 rounded-2xl"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Target className="text-gold mr-3 h-8 w-8" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                    {t("about_key_achievements_title")}
                  </h3>
                </div>
                <StaggerContainer className="space-y-4" staggerDelay={0.1}>
                  {[1, 2, 3, 4].map((num) => (
                    <motion.div 
                      key={num}
                      className="flex items-center group"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="w-3 h-3 bg-gradient-to-r from-gold to-yellow-500 rounded-full mr-6"
                        whileHover={{ 
                          scale: 1.5,
                          boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <p className="text-lg text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                        {t(`about_achievement_${num}`)}
                      </p>
                    </motion.div>
                  ))}
                </StaggerContainer>
              </motion.div>
            </StaggerContainer>
          </ScrollAnimated>
        </div>

        {/* Enhanced Statistics Section with advanced animations */}
        <ScrollAnimated animation="fadeIn">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.2}>
            <motion.div 
              className="text-center group glass-effect p-8 rounded-2xl"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-gold via-yellow-500 to-gold rounded-full w-20 h-20 flex items-center justify-center mx-auto"
                  whileHover={{ 
                    rotate: 360,
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)"
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
                    <TrendingUp className="text-black text-3xl" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="absolute -inset-2 bg-gold/20 rounded-full blur opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("about_analysis")}</h4>
              <motion.p 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.1 }}
              >
                <AnimatedCounter end={5} suffix="+" />
              </motion.p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">{t("about_analysis_years")}</p>
            </motion.div>

            <motion.div 
              className="text-center group glass-effect p-8 rounded-2xl"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-navy via-blue-800 to-navy rounded-full w-20 h-20 flex items-center justify-center mx-auto"
                  whileHover={{ 
                    rotate: 360,
                    boxShadow: "0 0 30px rgba(30, 41, 59, 0.8)"
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
                    <Coins className="text-gold text-3xl" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="absolute -inset-2 bg-navy/20 rounded-full blur opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("about_trading")}</h4>
              <motion.p 
                className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2"
                whileHover={{ scale: 1.1 }}
              >
                Advanced Level
              </motion.p>
              <p className="text-gray-600 dark:text-gray-300">{t("about_trading_level")}</p>
            </motion.div>

            <motion.div 
              className="text-center group glass-effect p-8 rounded-2xl"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)"
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative mb-6">
                <motion.div 
                  className="bg-gradient-to-br from-gold via-yellow-500 to-gold rounded-full w-20 h-20 flex items-center justify-center mx-auto"
                  whileHover={{ 
                    rotate: 360,
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.8)"
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
                    <Users className="text-black text-3xl" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="absolute -inset-2 bg-gold/20 rounded-full blur opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t("about_students")}</h4>
              <motion.p 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2"
                whileHover={{ scale: 1.1 }}
              >
                <AnimatedCounter end={1000} suffix="+" />
              </motion.p>
              <p className="text-gray-700 dark:text-gray-200 font-medium">{t("about_students_count")}</p>
            </motion.div>
          </StaggerContainer>
        </ScrollAnimated>
      </div>
    </section>
  );
}