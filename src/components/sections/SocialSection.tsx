import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, TrendingUp, Users, PlayCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const socialPlatforms = [
  {
    nameKey: "telegram",
    subscribersKey: "telegram_subscribers",
    descriptionKey: "telegram_desc",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    hoverColor: "hover:from-blue-500 hover:to-blue-700",
    borderColor: "border-blue-400",
    shadowColor: "shadow-blue-500/20",
    hoverShadow: "hover:shadow-blue-500/40",
    icon: "fab fa-telegram",
    url: "https://t.me/KarzanJabar",
    gradient: "from-blue-400/10 to-blue-600/10"
  },
  {
    nameKey: "telegram_arabic",
    subscribersKey: "telegram_arabic_subscribers",
    descriptionKey: "telegram_arabic_desc",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    hoverColor: "hover:from-blue-500 hover:to-blue-700",
    borderColor: "border-blue-400",
    shadowColor: "shadow-blue-500/20",
    hoverShadow: "hover:shadow-blue-500/40",
    icon: "fab fa-telegram",
    url: "https://t.me/KarzanJabar_Arabic",
    gradient: "from-blue-400/10 to-blue-600/10"
  },
  {
    nameKey: "instagram",
    subscribersKey: "instagram_subscribers",
    descriptionKey: "instagram_desc",
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    hoverColor: "hover:from-purple-600 hover:via-pink-600 hover:to-orange-500",
    borderColor: "border-pink-400",
    shadowColor: "shadow-pink-500/20",
    hoverShadow: "hover:shadow-pink-500/40",
    icon: "fab fa-instagram",
    url: "https://www.instagram.com/kjcompany_official",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    nameKey: "youtube",
    subscribersKey: "youtube_subscribers",
    descriptionKey: "youtube_desc",
    color: "bg-gradient-to-br from-red-500 to-red-700",
    hoverColor: "hover:from-red-600 hover:to-red-800",
    borderColor: "border-red-400",
    shadowColor: "shadow-red-500/20",
    hoverShadow: "hover:shadow-red-500/40",
    icon: "fab fa-youtube",
    url: "https://www.youtube.com/@kjkarzan",
    gradient: "from-red-500/10 to-red-700/10"
  },
  {
    nameKey: "facebook",
    subscribersKey: "facebook_subscribers",
    descriptionKey: "facebook_desc",
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    hoverColor: "hover:from-blue-700 hover:to-blue-900",
    borderColor: "border-blue-500",
    shadowColor: "shadow-blue-600/20",
    hoverShadow: "hover:shadow-blue-600/40",
    icon: "fab fa-facebook",
    url: "https://www.facebook.com/kjcompany.official",
    gradient: "from-blue-600/10 to-blue-800/10"
  },
  {
    nameKey: "linkedin",
    subscribersKey: "linkedin_subscribers",
    descriptionKey: "linkedin_desc",
    color: "bg-gradient-to-br from-blue-700 to-blue-900",
    hoverColor: "hover:from-blue-800 hover:to-indigo-900",
    borderColor: "border-blue-600",
    shadowColor: "shadow-blue-700/20",
    hoverShadow: "hover:shadow-blue-700/40",
    icon: "fab fa-linkedin",
    url: "https://www.linkedin.com/company/kjcompany/",
    gradient: "from-blue-700/10 to-blue-900/10"
  }
];

const recentContent = [
  {
    platformKey: "youtube",
    icon: "fab fa-youtube",
    iconColor: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    timeKey: "time_2_days_ago",
    titleKey: "youtube_content_title",
    descriptionKey: "youtube_content_desc",
    engagementKey: "views_12_5k",
    url: "https://youtu.be/Zpia6H6OuAo?si=UpGGa-3mcOrnW9fi"
  },
  {
    platformKey: "telegram",
    icon: "fab fa-telegram",
    iconColor: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    timeKey: "time_5_hours_ago",
    titleKey: "telegram_content_title",
    descriptionKey: "telegram_content_desc",
    engagementKey: "reactions_3_2k",
    url: "https://t.me/KJcompany_Kurdish/159"
  },
  {
    platformKey: "instagram",
    icon: "fab fa-instagram",
    iconColor: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-50 dark:bg-pink-900/20",
    timeKey: "time_1_day_ago",
    titleKey: "instagram_content_title",
    descriptionKey: "instagram_content_desc",
    engagementKey: "likes_8_7k",
    url: "https://www.instagram.com/reel/DAVZ3-VI99h/?igsh=MXg2ZjZ5eGR5bmJjMQ=="
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export function SocialSection() {
  const { t } = useTranslation();

  return (
    <section id="social" className="relative py-16 sm:py-20 lg:py-24 bg-transparent overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800">
            <Users className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{t('connect_with_me')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            {t("social_media_hub")}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            {t("social_media_hub_desc")}
          </p>
        </motion.div>

        {/* Social Platforms Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-4 mb-12 sm:mb-16"
        >
          {socialPlatforms.map((platform) => (
            <motion.div
              key={platform.nameKey}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`group relative overflow-hidden text-center border-2 ${platform.borderColor} ${platform.shadowColor} ${platform.hoverShadow} hover:shadow-2xl transition-all duration-500 h-full bg-white dark:bg-gray-800/50 backdrop-blur-sm`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <CardContent className="relative p-4 sm:p-5 lg:p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    {/* Icon with animated background */}
                    <div className="relative mb-4 sm:mb-5">
                      <div className={`${platform.color} rounded-2xl w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                        <i className={`${platform.icon} text-white text-2xl sm:text-3xl lg:text-4xl`}></i>
                      </div>
                      <div className={`absolute -inset-2 ${platform.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{t(platform.nameKey)}</h3>
                    <div className="flex items-center justify-center gap-1 mb-3 sm:mb-4">
                      {/* <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" /> */}
                      {/* <p className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-400">{t(platform.subscribersKey)}</p> */}
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
                      {t(platform.descriptionKey)}
                    </p>
                  </div>

                  <Button
                    asChild
                    className={`w-full ${platform.color} ${platform.hoverColor} text-white font-semibold transition-all duration-300 shadow-md hover:shadow-xl group-hover:scale-105 text-sm sm:text-base`}
                  >
                    <a href={platform.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      {platform.nameKey === "instagram" ? t("follow") :
                        platform.nameKey === "youtube" ? t("subscribe") :
                          platform.nameKey === "facebook" ? t("follow") :
                            platform.nameKey === "linkedin" ? t("follow") : t("join_channel")}
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="overflow-hidden border-2 border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 sm:p-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white text-center">{t("latest_content")}</h3>
              </div>
              <p className="text-center text-white/90 text-sm sm:text-base">{t('stay_updated_desc')}</p>
            </div>

            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {recentContent.map((content, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="group border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-xl h-full bg-white dark:bg-gray-800/50">
                      <CardContent className="p-4 sm:p-5 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className={`${content.bgColor} rounded-full p-2 sm:p-2.5`}>
                            <i className={`${content.icon} ${content.iconColor} text-lg sm:text-xl`}></i>
                          </div>
                          <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                        </div>

                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                          <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                            {t(content.platformKey)}
                          </span>
                          {/* <span className="text-xs text-gray-400">•</span> */}
                          {/* <span className="text-xs text-gray-500 dark:text-gray-400">
                            {t(content.timeKey)}
                          </span> */}
                        </div>

                        <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {t(content.titleKey)}
                        </h4>

                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2 flex-grow">
                          {t(content.descriptionKey)}
                        </p>

                        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{t(content.engagementKey)}</span>
                          <a href={content.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                            {t('view_more')}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Font Awesome CDN */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </div>
    </section>
  );
}