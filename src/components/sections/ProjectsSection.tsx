import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ArrowRight, Sparkles, Target, Users, TrendingUp, Award, Zap, Globe, Shield, BookOpen, Maximize2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import { ImageLightbox } from "../ImageLightbox";
import { LazyImage } from "../ui/LazyImage";

const projectFeatures = [
  {
    titleKey: "educational_content_library",
    descriptionKey: "educational_content_library_desc",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    titleKey: "community_platform",
    descriptionKey: "community_platform_desc",
    icon: Users,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    titleKey: "trading_tools_analytics",
    descriptionKey: "trading_tools_analytics_desc",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  }
];

const statistics = [
  {
    value: "3000+",
    labelKey: "students_trained",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    value: "85%",
    labelKey: "success_rate",
    icon: Target,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-900/20"
  },
  {
    value: "10+",
    labelKey: "countries_reached",
    icon: Globe,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    value: "18/7",
    labelKey: "support_available",
    icon: Shield,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function ProjectsSection() {
  const { t } = useTranslation();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section id="projects" className="relative py-16 sm:py-20 lg:py-28 bg-transparent overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute top-20 -right-20 w-72 h-72 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 -left-20 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... rest of the content ... */}
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center justify-center px-4 py-2 mb-4 sm:mb-6 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t('portfolio_achievements')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {t("my_work_projects")}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              {t("discover_initiatives")}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start mb-12 sm:mb-16 lg:mb-20">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}

              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30">
                  <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-xs sm:text-sm font-semibold text-yellow-600 dark:text-yellow-400">{t('featured_project')}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("kj_project_title")}
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t("kj_project_description")}
                </p>
              </div>

              {/* Features Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"

                className="space-y-4"
              >
                {projectFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 8 }}
                      className="group"
                    >
                      <Card className={`border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 overflow-hidden ${feature.bgColor} hover:shadow-xl`}>
                        <CardContent className="p-4 sm:p-5 lg:p-6">
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {t(feature.titleKey)}
                              </h4>
                              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t(feature.descriptionKey)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Button
                  onClick={handleScrollToContact}
                  className="group w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl rounded-xl"
                >
                  <span>{t("learn_more")}</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}

              transition={{ duration: 0.6 }}
              className="relative order-first lg:order-last"
            >
              <div className="relative group cursor-pointer z-20" onClick={() => setIsLightboxOpen(true)}>
                {/* Glowing effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl opacity-60 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Main image card */}
                <Card className="relative overflow-hidden border-0 shadow-2xl">
                  <div className="h-[400px] sm:h-[500px] lg:h-[600px] w-full overflow-hidden relative">
                    <LazyImage
                      src="/images/project.jpg"
                      alt={t("financial_success_img_alt")}
                      priority={true}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30"
                      >
                        <Maximize2 className="text-white w-8 h-8" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-xl border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Trusted by</p>
                          <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{t('students_1000_plus')}</p>
                        </div>
                        <div className="flex -space-x-2">
                          <img
                            src="https://i.pravatar.cc/100?img=33"
                            alt="User"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                          />
                          <img
                            src="https://i.pravatar.cc/100?img=47"
                            alt="User"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                          />
                          <img
                            src="https://i.pravatar.cc/100?img=12"
                            alt="User"
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                          />
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

            </motion.div>
          </div>

          {/* Enhanced Project Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-800 dark:via-gray-900 dark:to-indigo-950">
              <div className="relative p-6 sm:p-8 lg:p-12">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

                <div className="relative">
                  <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                      <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{t('impact_metrics')}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      {t("project_impact")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {statistics.map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}

                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="group"
                        >
                          <Card className={`text-center border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 ${stat.bgColor} hover:shadow-xl`}>
                            <CardContent className="p-4 sm:p-6">
                              <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                              </div>
                              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                                {stat.value}
                              </div>
                              <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                                {t(stat.labelKey)}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <ImageLightbox
        src="/images/project.jpg"
        alt={t("financial_success_img_alt")}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}