import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sprout, TrendingUp, Crown, Star, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ScrollAnimated, StaggerContainer, FloatingElement, AnimatedSection } from "../AnimatedSection";
import { useState } from "react";
import { FreeCoursModal } from "../FreeCoursModal";

const courses = [
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

  const handleEnrollment = (courseTitleKey: string) => {
    toast({
      title: t("enrollment_interest_received"),
      description: t("enrollment_thank_you", { course: t(courseTitleKey) }),
    });
  };

  return (
    <section id="courses" className="py-24 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced background elements with floating animations */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement className="absolute top-1/4 left-10" intensity={15} duration={6}>
          <div className="w-32 h-32 bg-gold/10 rounded-full blur-2xl"></div>
        </FloatingElement>
        <FloatingElement className="absolute bottom-1/4 right-10" intensity={20} duration={8}>
          <div className="w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        </FloatingElement>
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-gold/5 to-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Enhanced section header */}
        <ScrollAnimated animation="fadeIn" className="text-center mb-20">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold font-heading mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            viewport={{ once: true }}
          >
            <span className="gradient-text">{t("trading_courses")}</span>
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t("courses_intro")}
          </motion.p>
        </ScrollAnimated>
        
        {/* Enhanced courses grid with sophisticated animations */}
        <ScrollAnimated animation="fadeIn">
          <StaggerContainer className="grid md:grid-cols-3 gap-10 mb-20" staggerDelay={0.2}>
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                whileHover={{ 
                  y: -10,
                  rotateY: course.isPopular ? 5 : 0,
                  scale: course.isPopular ? 1.05 : 1.02
                }}
                transition={{ duration: 0.4 }}
              >
                <Card 
                  className={`relative group overflow-hidden h-full ${
                    course.isPopular 
                      ? 'bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/40 border-2 shadow-2xl' 
                      : 'glass-effect border-gray-200/50 dark:border-gray-700/50'
                  }`}
                >
                  <CardContent className="p-8 relative h-full flex flex-col">
                    {course.isPopular && (
                      <>
                        {/* Enhanced sparkle effects */}
                        <motion.div 
                          className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full"
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
                          className="absolute top-6 right-2 w-1 h-1 bg-yellow-400 rounded-full"
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
                      </>
                    )}
                    
                    {/* Most Popular Badge - positioned above icon */}
                    {course.isPopular && (
                      <motion.div
                        className="text-center mb-4"
                        animate={{
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="inline-block bg-gradient-to-r from-gold via-yellow-500 to-gold text-black font-bold py-2 px-4 text-sm rounded-full shadow-lg">
                          ⭐ {t("most_popular")} ⭐
                        </div>
                      </motion.div>
                    )}
                    
                    <div className="text-center mb-8">
                      <motion.div 
                        className={`relative ${course.iconBg} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6`}
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 360
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                            y: [0, -2, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                        >
                          <course.icon className={`${course.iconColor} text-3xl`} />
                        </motion.div>
                        <motion.div 
                          className="absolute -inset-2 bg-gradient-to-r from-gold/30 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                      <motion.h3 
                        className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-300"
                        whileHover={{ 
                          scale: 1.05,
                          color: "hsl(var(--primary))"
                        }}
                      >
                        {t(course.titleKey)}
                      </motion.h3>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-5xl font-bold gradient-text mb-2">{course.price}</p>
                        {course.isPopular && (
                          <motion.div 
                            className="absolute -inset-2 bg-gold/20 rounded-lg blur opacity-0 group-hover:opacity-100"
                            animate={{
                              scale: [1, 1.05, 1]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                    
                    <div className="flex-1">
                      <StaggerContainer className="space-y-4 mb-10" staggerDelay={0.05}>
                        {course.features.map((feature, featureIndex) => (
                          <motion.div 
                            key={featureIndex} 
                            className="flex items-start text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300"
                            whileHover={{ x: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="relative">
                              <motion.div
                                whileHover={{
                                  scale: 1.3,
                                  rotate: 360
                                }}
                                transition={{ duration: 0.4 }}
                              >
                                <Check className="text-green-500 mr-4 h-5 w-5 mt-0.5 transition-colors duration-300" />
                              </motion.div>
                              <motion.div 
                                className="absolute -inset-1 bg-green-500/20 rounded-full opacity-0 group-hover:opacity-100"
                                whileHover={{ scale: 1.5 }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <span className="text-lg">{t(feature)}</span>
                          </motion.div>
                        ))}
                      </StaggerContainer>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={() => handleEnrollment(course.titleKey)}
                        className={`w-full text-lg font-bold py-4 transition-all duration-500 ${
                          course.isPopular 
                            ? 'bg-gradient-to-r from-gold via-yellow-500 to-gold hover:from-yellow-500 hover:via-gold hover:to-yellow-500 text-black shadow-xl'
                            : 'bg-gold hover:bg-gold-dark text-black'
                        }`}
                      >
                        {t("enroll_now")}
                      </Button>
                    </motion.div>
                    
                    {/* Enhanced decorative elements */}
                    <motion.div 
                      className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gold/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100"
                      animate={{
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100"
                      animate={{
                        rotate: [0, -5, 5, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggerContainer>
        </ScrollAnimated>
        
        {/* Enhanced Testimonials Section */}
        <ScrollAnimated animation="fadeIn">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect p-10 border-gold/20 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <ScrollAnimated animation="fadeIn" delay={200}>
                <h3 className="text-4xl font-bold text-center mb-16">
                  <span className="gradient-text">{t("student_success_stories")}</span>
                </h3>
              </ScrollAnimated>
              
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="glass-effect border-gray-200/20 dark:border-gray-700/20 group h-full">
                      <CardContent className="p-8 h-full flex flex-col">
                        <div className="flex items-center mb-6">
                          <motion.div 
                            className="relative"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img 
                              src={testimonial.image} 
                              alt={`${testimonial.name} testimonial portrait`}
                              className="w-16 h-16 rounded-full mr-4 object-cover ring-2 ring-gold/30 group-hover:ring-gold/60 transition-all duration-300"
                            />
                            <motion.div 
                              className="absolute -inset-1 bg-gradient-to-r from-gold to-yellow-500 rounded-full opacity-0 group-hover:opacity-20 blur"
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{testimonial.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t(testimonial.roleKey)}</p>
                          </div>
                        </div>
                        
                        <blockquote className="relative flex-1">
                          <motion.div 
                            className="absolute -top-2 -left-2 text-4xl text-gold/30 font-serif"
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            "
                          </motion.div>
                          <p className="text-gray-600 dark:text-gray-300 italic mb-6 text-lg leading-relaxed pl-6">
                            {t(testimonial.quoteKey)}
                          </p>
                          <motion.div 
                            className="absolute -bottom-2 -right-2 text-4xl text-gold/30 font-serif rotate-180"
                            animate={{
                              rotate: [180, 185, 175, 180],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 2
                            }}
                          >
                            "
                          </motion.div>
                        </blockquote>
                        
                        <motion.div 
                          className="flex text-gold space-x-1"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <StaggerContainer className="flex space-x-1" staggerDelay={0.1}>
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <motion.div
                                key={i}
                                whileHover={{ 
                                  scale: 1.3,
                                  rotate: 360
                                }}
                                transition={{ duration: 0.4 }}
                              >
                                <Star className="h-5 w-5 fill-current" />
                              </motion.div>
                            ))}
                          </StaggerContainer>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </StaggerContainer>
            </Card>
          </motion.div>
        </ScrollAnimated>
      </div>
    </section>
  );
}