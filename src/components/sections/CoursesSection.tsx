import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Sprout, TrendingUp, Crown, Star, Play, Sparkles, Award, Clock, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ScrollAnimated, StaggerContainer, FloatingElement } from "../AnimatedSection";
import { useState } from "react";
import { FreeCoursModal } from "../FreeCoursModal";
import { AdvancedCourseEnroll } from "../AdvancedCourseEnroll";
import { LazyImage } from "../ui/LazyImage";

const courses = [
  {
    id: 0,
    titleKey: "beginner_course",
    price: "FREE",
    icon: Sprout,
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
    iconColor: "text-white",
    isFree: true,
    taglineKey: "beginner_tagline",
    features: [
      "market_fundamentals",
      "risk_management_basics",
      "platform_setup_guide",
      "broker_types_selection"
    ]
  },
  {
    id: 1,
    titleKey: "advanced_course",
    price: "FREE",
    icon: TrendingUp,
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    iconColor: "text-white",
    isFree: true,
    isPopular: true,
    taglineKey: "advanced_tagline",
    features: [
      "technical_analysis_mastery",
      "advanced_chart_patterns",
      "algorithmic_trading_strategies",
      "advanced_indicators_use"
    ]
  },
  {
    id: 2,
    titleKey: "campus_course",
    price: "SOON",
    icon: Crown,
    iconBg: "bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800",
    iconColor: "text-gray-600 dark:text-gray-300",
    isComingSoon: true,
    taglineKey: "campus_tagline",
    features: [
      "complete_trading_system",
      "daily_live_sessions",
      "community_access",
      "certification_program"
    ]
  }
];

const testimonials = [
  {
    name: "Chnwr Karwan",
    roleKey: "intermediate_graduate",
    image: "https://i.pravatar.cc/100?img=5",
    quoteKey: "testimonial_zagros",
    rating: 5
  },
  {
    name: "Raman Sangawy",
    roleKey: "advanced_graduate",
    image: "/images/profile2.png",
    quoteKey: "testimonial_raman",
    rating: 5
  },
  {
    name: "Aster Dllshad",
    roleKey: "beginner_graduate",
    image: "https://i.pravatar.cc/100?img=9",
    quoteKey: "testimonial_xkj",
    rating: 5
  }
];

export function CoursesSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isFreeCourseModalOpen, setIsFreeCourseModalOpen] = useState(false);
  const [isAdvancedEnrollOpen, setIsAdvancedEnrollOpen] = useState(false);

  const handleEnrollment = (courseTitleKey: string, isFree: boolean = false, isComingSoon: boolean = false) => {
    if (isComingSoon) {
      toast({
        title: t("coming_soon"),
        description: t("course_coming_soon_notify"),
      });
      return;
    }

    if (courseTitleKey === "advanced_course") {
      setIsAdvancedEnrollOpen(true);
    } else if (isFree) {
      setIsFreeCourseModalOpen(true);
    } else {
      toast({
        title: t("enrollment_interest_received"),
        description: t("enrollment_thank_you", { course: t(courseTitleKey) }),
      });
    }
  };

  return (
    <section id="courses" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement className="absolute top-10 left-5 sm:top-1/4 sm:left-10" intensity={15} duration={6}>
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-2xl"></div>
        </FloatingElement>
        <FloatingElement className="absolute bottom-10 right-5 sm:bottom-1/4 sm:right-10" intensity={20} duration={8}>
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full blur-3xl"></div>
        </FloatingElement>
        <FloatingElement className="absolute top-1/3 right-1/4" intensity={12} duration={10}>
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-r from-gray-500/5 to-gray-600/5 rounded-full blur-2xl"></div>
        </FloatingElement>
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-r from-green-500/5 via-blue-500/5 to-blue-600/5 rounded-full blur-3xl"
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimated animation="fadeIn" className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-full backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-green-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
              {t("learn_trading_free")}
            </span>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 sm:mb-6 md:mb-8 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-blue-900 dark:from-white dark:via-blue-200 dark:to-blue-300 bg-clip-text text-transparent">
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

        <ScrollAnimated animation="fadeIn">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20" staggerDelay={0.15}>
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                whileHover={{
                  y: course.isComingSoon ? 0 : -8,
                  scale: course.isComingSoon ? 1 : 1.02
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Card
                  className={`relative group overflow-hidden h-full backdrop-blur-sm transition-all duration-300 ${course.isPopular
                    ? 'bg-gradient-to-br from-blue-500/10 via-blue-500/8 to-blue-600/10 border-blue-500/30 border-2 shadow-xl hover:shadow-blue-500/20'
                    : course.isComingSoon
                      ? 'bg-gradient-to-br from-gray-100/60 to-gray-200/60 dark:from-gray-800/60 dark:to-gray-900/60 border-gray-300/30 dark:border-gray-600/30 border-2 shadow-lg'
                      : 'bg-gradient-to-br from-white/70 to-green-50/70 dark:from-gray-800/70 dark:to-green-900/10 border-2 border-transparent hover:border-green-500/30 dark:hover:border-green-400/30 shadow-lg hover:shadow-xl'
                    }`}
                >
                  {!course.isComingSoon && (
                    <motion.div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${course.isPopular
                        ? 'bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5'
                        : 'bg-gradient-to-br from-green-500/3 via-transparent to-emerald-500/3'
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
                  )}

                  <CardContent className="p-4 sm:p-6 md:p-8 relative h-full flex flex-col">
                    {course.isPopular && (
                      <>
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
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full shadow-lg backdrop-blur-sm bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white">
                            <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{t("most_popular")}</span>
                            <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full"
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
                          className="absolute top-6 right-4 w-1.5 h-1.5 bg-blue-400 rounded-full"
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
                          className="absolute top-4 right-8 w-1 h-1 bg-blue-300 rounded-full"
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

                    {course.isComingSoon && (
                      <motion.div
                        className="text-center mb-3 sm:mb-4"
                        animate={{
                          y: [0, -2, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full shadow-lg backdrop-blur-sm bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 text-white">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{t("coming_soon")}</span>
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </motion.div>
                    )}

                    {!course.isPopular && !course.isComingSoon && (
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
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-full shadow-lg backdrop-blur-sm bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white">
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{t("completely_free")}</span>
                          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                      </motion.div>
                    )}

                    <div className="text-center mb-4 sm:mb-6 md:mb-8">
                      <motion.div
                        className={`relative ${course.iconBg} rounded-xl sm:rounded-2xl w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 ${course.isComingSoon ? 'opacity-70' : ''}`}
                        whileHover={{
                          scale: course.isComingSoon ? 1 : 1.15,
                          rotate: course.isComingSoon ? 0 : 5
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.div
                          animate={{
                            y: course.isComingSoon ? 0 : [0, -3, 0]
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
                        {!course.isComingSoon && (
                          <motion.div
                            className={`absolute -inset-2 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${course.isPopular ? 'bg-blue-500/50' : 'bg-green-500/50'
                              }`}
                          />
                        )}
                      </motion.div>

                      <motion.h3
                        className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 transition-all duration-300 ${course.isComingSoon ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white group-hover:scale-105'}`}
                      >
                        {t(course.titleKey)}
                      </motion.h3>

                      {course.taglineKey && (
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
                          {t(course.taglineKey)}
                        </p>
                      )}

                      <motion.div
                        className="relative"
                        whileHover={{ scale: course.isComingSoon ? 1 : 1.08 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 ${course.isComingSoon
                          ? 'text-gray-400 dark:text-gray-500'
                          : course.isPopular
                            ? 'bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 bg-clip-text text-transparent'
                            : course.isFree
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent'
                          }`}>
                          {course.price}
                        </p>
                        {!course.isComingSoon && !course.isPopular && (
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{t("lifetime_access")}</p>
                        )}
                        {course.isPopular && (
                          <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-500 font-semibold">{t("most_popular_choice")}</p>
                        )}
                      </motion.div>
                    </div>

                    <div className="flex-1 mb-4 sm:mb-6">
                      <StaggerContainer className="space-y-2 sm:space-y-3 md:space-y-4" staggerDelay={0.05}>
                        {course.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className={`flex items-start transition-colors duration-300 ${course.isComingSoon ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white'}`}
                            whileHover={{ x: course.isComingSoon ? 0 : 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="relative flex-shrink-0">
                              {course.isComingSoon ? (
                                <Lock className="text-gray-400 mr-2 sm:mr-3 md:mr-4 h-4 w-4 sm:h-5 sm:w-5 mt-0.5" />
                              ) : (
                                <motion.div
                                  className="relative z-10"
                                  whileHover={{
                                    scale: 1.2,
                                    rotate: 360
                                  }}
                                  transition={{ duration: 0.4 }}
                                >
                                  <Check className={`mr-2 sm:mr-3 md:mr-4 h-4 w-4 sm:h-5 sm:w-5 mt-0.5 transition-colors duration-300 ${course.isPopular ? 'text-blue-500' : 'text-green-500'
                                    }`} />
                                </motion.div>
                              )}
                            </div>
                            <span className="text-sm sm:text-base md:text-lg leading-tight">{t(feature)}</span>
                          </motion.div>
                        ))}
                      </StaggerContainer>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => handleEnrollment(course.titleKey, course.isFree, course.isComingSoon)}
                        className={`w-full text-lg font-bold py-4 transition-all duration-500 rounded-lg sm:rounded-xl relative overflow-hidden group/btn ${course.isComingSoon
                          ? 'bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-lg'
                          : course.isPopular
                            ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 text-white shadow-xl hover:shadow-blue-500/50'
                            : 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-600 text-white shadow-xl hover:shadow-green-500/50'
                          }`}
                        disabled={course.isComingSoon}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {course.isComingSoon ? (
                            <>
                              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                              {t("notify_me")}
                            </>
                          ) : course.isPopular ? (
                            <>
                              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                              {t("enroll_now")}
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                              {t("start_free_course")}
                            </>
                          )}
                        </span>
                        {!course.isComingSoon && (
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
                        )}
                      </Button>
                    </motion.div>

                    {!course.isComingSoon && (
                      <>
                        <motion.div
                          className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${course.isPopular ? 'bg-gradient-to-br from-blue-500/10' : 'bg-gradient-to-br from-green-500/10'
                            }`}
                        />
                        <motion.div
                          className={`absolute bottom-0 left-0 w-12 h-12 sm:w-16 sm:h-16 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${course.isPopular ? 'bg-gradient-to-tr from-blue-600/10' : 'bg-gradient-to-tr from-emerald-500/10'
                            }`}
                        />
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        </ScrollAnimated>

        <ScrollAnimated animation="fadeIn">
          <motion.div
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-6 sm:p-8 md:p-10 border-2 border-blue-500/20 dark:border-blue-500/30 relative overflow-hidden shadow-2xl">
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
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
                    className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-full backdrop-blur-sm"
                  >
                    <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {t("verified_reviews")}
                    </span>
                  </motion.div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-blue-900 dark:from-white dark:via-blue-200 dark:to-blue-300 bg-clip-text text-transparent px-4">
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
                    <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group h-full hover:border-blue-500/40 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl">
                      <CardContent className="p-4 sm:p-6 md:p-8 h-full flex flex-col">
                        <div className="flex items-center mb-4 sm:mb-6">
                          <motion.div
                            className="relative flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <LazyImage
                              src={testimonial.image}
                              alt={`${testimonial.name} testimonial portrait`}
                              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full mr-3 sm:mr-4 object-cover ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all duration-300 shadow-lg"
                            />
                            <motion.div
                              className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-opacity duration-300"
                            />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">{testimonial.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium truncate">{t(testimonial.roleKey)}</p>
                          </div>
                        </div>

                        <blockquote className="relative flex-1 mb-4 sm:mb-6">
                          <motion.div
                            className="absolute -top-1 -left-1 text-3xl sm:text-4xl text-blue-500/30 font-serif leading-none"
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
                            className="absolute -bottom-1 -right-1 text-3xl sm:text-4xl text-blue-500/30 font-serif rotate-180 leading-none"
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
                                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 fill-blue-500 drop-shadow-sm" />
                              </motion.div>
                            ))}
                          </StaggerContainer>
                          <span className="ml-2 text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {testimonial.rating}.0
                          </span>
                        </motion.div>

                        <motion.div
                          className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium"
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

              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"
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

      <FreeCoursModal
        isOpen={isFreeCourseModalOpen}
        onClose={() => setIsFreeCourseModalOpen(false)}
      />

      <AdvancedCourseEnroll
        isOpen={isAdvancedEnrollOpen}
        onClose={() => setIsAdvancedEnrollOpen(false)}
      />
    </section>
  );
}