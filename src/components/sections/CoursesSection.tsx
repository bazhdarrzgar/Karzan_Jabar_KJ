import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sprout, TrendingUp, Crown, Star, Play, Sparkles, Award, BookOpen, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ScrollAnimated, StaggerContainer, FloatingElement, AnimatedSection } from "../AnimatedSection";
import { useState } from "react";
import { FreeCoursModal } from "../FreeCoursModal";

const courses = [
  {
    id: 0,
    titleKey: "free_course",
    price: "FREE",
    icon: Play,
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
    iconColor: "text-white",
    isFree: true,
    features: [
      "free_course_feature_1",
      "free_course_feature_2", 
      "free_course_feature_3",
      "free_course_feature_4"
    ]
  },
  {
    id: 1,
    titleKey: "beginner_course",
    price: "$299",
    icon: Sprout,
    iconBg: "bg-green-100 dark:bg-green-900",
    iconColor: "text-green-600 dark:text-green-400",
    features: [
      "market_fundamentals",
      "risk_management_basics", 
      "platform_setup_guide",
      "live_trading_sessions"
    ]
  },
  {
    id: 2,
    titleKey: "intermediate_course",
    price: "$599",
    icon: TrendingUp,
    iconBg: "bg-gold",
    iconColor: "text-black",
    isPopular: true,
    features: [
      "technical_analysis_mastery",
      "advanced_chart_patterns",
      "psychology_of_trading",
      "portfolio_management"
    ]
  },
  {
    id: 3,
    titleKey: "advanced_course", 
    price: "$999",
    icon: Crown,
    iconBg: "bg-purple-100 dark:bg-purple-900",
    iconColor: "text-purple-600 dark:text-purple-400",
    features: [
      "algorithmic_trading_strategies",
      "options_derivatives",
      "risk_arbitrage",
      "one_on_one_mentorship"
    ]
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    roleKey: "intermediate_graduate",
    image: "https://avatar.iran.liara.run/public/girl?username=sarah",
    quoteKey: "testimonial_sarah",
    rating: 5
  },
  {
    name: "Michael Chen",
    roleKey: "advanced_graduate", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    quoteKey: "testimonial_michael",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    roleKey: "beginner_graduate",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", 
    quoteKey: "testimonial_emily",
    rating: 5
  }
];

export function CoursesSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isFreeCourseModalOpen, setIsFreeCourseModalOpen] = useState(false);

  const handleEnrollment = (courseTitleKey: string, isFree: boolean = false) => {
    if (isFree) {
      setIsFreeCourseModalOpen(true);
    } else {
      toast({
        title: t("enrollment_interest_received"),
        description: t("enrollment_thank_you", { course: t(courseTitleKey) }),
      });
    }
  };

  return (
    <section id="courses" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
      {/* Enhanced background with modern gradient mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement className="absolute top-10 left-5 sm:top-1/4 sm:left-10" intensity={15} duration={6}>
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-gold/20 to-yellow-500/20 rounded-full blur-2xl"></div>
        </FloatingElement>
        <FloatingElement className="absolute bottom-10 right-5 sm:bottom-1/4 sm:right-10" intensity={20} duration={8}>
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        </FloatingElement>
        <FloatingElement className="absolute top-1/3 right-1/4" intensity={12} duration={10}>
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-2xl"></div>
        </FloatingElement>
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-gold/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Modern section header with badge */}
        <ScrollAnimated animation="fadeIn" className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-gold/20 via-blue-500/20 to-purple-500/20 border border-gold/30 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold bg-gradient-to-r from-gold via-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("comprehensive_learning_paths")}
            </span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </motion.div>
          
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 sm:mb-6 md:mb-8 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              {t("trading_courses")}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("courses_intro")}
          </motion.p>
        </ScrollAnimated>
        
        {/* Improved courses grid with perfect responsiveness */}
        <ScrollAnimated animation="fadeIn">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20" staggerDelay={0.15}>
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                whileHover={{ 
                  y: -8,
                  scale: 1.02
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card 
                  className={`relative group overflow-hidden h-full backdrop-blur-sm transition-all duration-300 ${
                    course.isPopular 
                      ? 'bg-gradient-to-br from-gold/30 via-gold/15 to-yellow-500/20 border-gold/50 border-2 shadow-2xl hover:shadow-gold/30' 
                      : course.isFree
                      ? 'bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-green-600/15 border-green-500/40 border-2 shadow-xl hover:shadow-green-500/20'
                      : 'bg-white/80 dark:bg-gray-800/80 border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/40 dark:hover:border-blue-400/40 hover:shadow-xl'
                  }`}
                >
                  {/* Animated gradient overlay */}
                  <motion.div 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      course.isPopular 
                        ? 'bg-gradient-to-br from-gold/10 via-transparent to-yellow-500/10'
                        : course.isFree
                        ? 'bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5'
                        : 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5'
                    }`}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <CardContent className="p-4 sm:p-6 md:p-8 relative h-full flex flex-col">
                    {/* Sparkle effects for popular course */}
                    {course.isPopular && (
                      <>
                        <motion.div 
                          className="absolute top-3 right-3 w-2 h-2 bg-gold rounded-full"
                          animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0
                          }}
                        />
                        <motion.div 
                          className="absolute top-6 right-4 w-1.5 h-1.5 bg-yellow-400 rounded-full"
                          animate={{
                            scale: [0, 1.2, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5
                          }}
                        />
                        <motion.div 
                          className="absolute top-4 right-8 w-1 h-1 bg-yellow-300 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1
                          }}
                        />
                      </>
                    )}
                    
                    {/* Badge section - Most Popular or Free */}
                    {(course.isPopular || course.isFree) && (
                      <motion.div
                        className="text-center mb-3 sm:mb-4"
                        animate={{
                          y: [0, -3, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full shadow-lg backdrop-blur-sm ${
                          course.isPopular 
                            ? 'bg-gradient-to-r from-gold via-yellow-500 to-gold text-black'
                            : 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white'
                        }`}>
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{course.isPopular ? t("most_popular") : t("completely_free")}</span>
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Course icon and title */}
                    <div className="text-center mb-4 sm:mb-6 md:mb-8">
                      <motion.div 
                        className={`relative ${course.iconBg} rounded-xl sm:rounded-2xl w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                        whileHover={{ 
                          scale: 1.15,
                          rotate: 5
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -3, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.3
                          }}
                        >
                          <course.icon className={`${course.iconColor} text-2xl sm:text-3xl`} />
                        </motion.div>
                        {/* Glow effect */}
                        <motion.div 
                          className={`absolute -inset-2 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${
                            course.isPopular ? 'bg-gold/50' : course.isFree ? 'bg-green-500/50' : 'bg-blue-500/50'
                          }`}
                        />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4 transition-all duration-300 group-hover:scale-105"
                      >
                        {t(course.titleKey)}
                      </motion.h3>
                      
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 ${
                          course.isFree 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent'
                            : 'bg-gradient-to-r from-gold via-yellow-600 to-gold bg-clip-text text-transparent'
                        }`}>
                          {course.price}
                        </p>
                        {!course.isFree && (
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("one_time_payment")}</p>
                        )}
                      </motion.div>
                    </div>
                    
                    {/* Features list */}
                    <div className="flex-1 mb-4 sm:mb-6">
                      <StaggerContainer className="space-y-2 sm:space-y-3 md:space-y-4" staggerDelay={0.05}>
                        {course.features.map((feature, featureIndex) => (
                          <motion.div 
                            key={featureIndex} 
                            className="flex items-start text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="relative flex-shrink-0">
                              <motion.div
                                className="relative z-10"
                                whileHover={{
                                  scale: 1.2,
                                  rotate: 360
                                }}
                                transition={{ duration: 0.4 }}
                              >
                                <Check className="text-green-500 mr-2 sm:mr-3 md:mr-4 h-4 w-4 sm:h-5 sm:w-5 mt-0.5 transition-colors duration-300" />
                              </motion.div>
                            </div>
                            <span className="text-sm sm:text-base md:text-lg leading-tight">{t(feature)}</span>
                          </motion.div>
                        ))}
                      </StaggerContainer>
                    </div>
                    
                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button 
                        onClick={() => handleEnrollment(course.titleKey, course.isFree)}
                        className={`w-full text-sm sm:text-base md:text-lg font-bold py-3 sm:py-4 md:py-6 px-4 sm:px-6 transition-all duration-500 rounded-lg sm:rounded-xl relative overflow-hidden group/btn ${
                          course.isFree
                            ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-green-500/50'
                            : course.isPopular 
                              ? 'bg-gradient-to-r from-gold via-yellow-500 to-gold hover:from-yellow-500 hover:via-gold hover:to-yellow-500 text-black shadow-lg hover:shadow-gold/50'
                              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/50'
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {course.isFree ? (
                            <>
                              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                              {t("start_free_course")}
                            </>
                          ) : (
                            <>
                              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                              {t("enroll_now")}
                            </>
                          )}
                        </span>
                        {/* Button shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3
                          }}
                        />
                      </Button>
                    </motion.div>
                    
                    {/* Decorative corner elements */}
                    <motion.div 
                      className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        course.isPopular ? 'bg-gradient-to-br from-gold/10' : course.isFree ? 'bg-gradient-to-br from-green-500/10' : 'bg-gradient-to-br from-blue-500/10'
                      }`}
                    />
                    <motion.div 
                      className={`absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        course.isPopular ? 'bg-gradient-to-tr from-yellow-500/10' : course.isFree ? 'bg-gradient-to-tr from-emerald-500/10' : 'bg-gradient-to-tr from-purple-500/10'
                      }`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        </ScrollAnimated>
        
        {/* Modern Testimonials Section with improved responsiveness */}
        <ScrollAnimated animation="fadeIn">
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-6 sm:p-8 md:p-10 border-2 border-gold/20 dark:border-gold/30 relative overflow-hidden shadow-2xl">
              {/* Animated top border */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <ScrollAnimated animation="fadeIn" delay={200}>
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-gold/20 to-purple-500/20 border border-gold/30 rounded-full backdrop-blur-sm"
                  >
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {t("verified_reviews")}
                    </span>
                  </motion.div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent px-4">
                    {t("student_success_stories")}
                  </h3>
                </div>
              </ScrollAnimated>
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" staggerDelay={0.12}>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="h-full"
                  >
                    <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group h-full hover:border-gold/40 dark:hover:border-gold/50 transition-all duration-300 hover:shadow-xl">
                      <CardContent className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                        {/* Profile section */}
                        <div className="flex items-center mb-4 sm:mb-6">
                          <motion.div 
                            className="relative flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img 
                              src={testimonial.image} 
                              alt={`${testimonial.name} testimonial portrait`}
                              loading="lazy"
                              decoding="async"
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mr-3 sm:mr-4 object-cover ring-2 ring-gold/30 group-hover:ring-gold/60 transition-all duration-300 shadow-lg"
                            />
                            {/* Glow effect on avatar */}
                            <motion.div 
                              className="absolute -inset-1 bg-gradient-to-r from-gold to-yellow-500 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"
                            />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">{testimonial.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{t(testimonial.roleKey)}</p>
                          </div>
                        </div>
                        
                        {/* Quote */}
                        <blockquote className="relative flex-1 mb-4 sm:mb-6">
                          <motion.div 
                            className="absolute -top-1 -left-1 text-3xl sm:text-4xl text-gold/30 font-serif leading-none"
                            animate={{
                              opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            "
                          </motion.div>
                          <p className="text-gray-600 dark:text-gray-300 italic text-sm sm:text-base md:text-lg leading-relaxed pl-4 sm:pl-6">
                            {t(testimonial.quoteKey)}
                          </p>
                          <motion.div 
                            className="absolute -bottom-1 -right-1 text-3xl sm:text-4xl text-gold/30 font-serif rotate-180 leading-none"
                            animate={{
                              opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1.5
                            }}
                          >
                            "
                          </motion.div>
                        </blockquote>
                        
                        {/* Rating stars */}
                        <motion.div 
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <StaggerContainer className="flex gap-0.5 sm:gap-1" staggerDelay={0.08}>
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ 
                                  scale: 1.2,
                                  rotate: 360
                                }}
                                transition={{ duration: 0.4 }}
                              >
                                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-gold fill-gold drop-shadow-sm" />
                              </motion.div>
                            ))}
                          </StaggerContainer>
                          <span className="ml-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {testimonial.rating}.0
                          </span>
                        </motion.div>
                        
                        {/* Verified badge */}
                        <motion.div 
                          className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{t("verified_student")}</span>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </StaggerContainer>
              
              {/* Bottom decorative line */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                animate={{
                  x: ['100%', '-100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </Card>
          </motion.div>
        </ScrollAnimated>
      </div>

      {/* Free Course Modal */}
      <FreeCoursModal 
        isOpen={isFreeCourseModalOpen}
        onClose={() => setIsFreeCourseModalOpen(false)}
      />
    </section>
  );
}