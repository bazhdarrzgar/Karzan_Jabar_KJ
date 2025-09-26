import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const socialPlatforms = [
  {
    nameKey: "telegram",
    subscribersKey: "telegram_subscribers",
    descriptionKey: "telegram_desc",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
    icon: "fab fa-telegram",
    url: "#"
  },
  {
    nameKey: "instagram",
    subscribersKey: "instagram_subscribers",
    descriptionKey: "instagram_desc",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    hoverColor: "hover:from-purple-600 hover:to-pink-600",
    icon: "fab fa-instagram",
    url: "#"
  },
  {
    nameKey: "youtube",
    subscribersKey: "youtube_subscribers",
    descriptionKey: "youtube_desc",
    color: "bg-red-600",
    hoverColor: "hover:bg-red-700",
    icon: "fab fa-youtube",
    url: "#"
  },
  {
    nameKey: "facebook",
    subscribersKey: "facebook_subscribers",
    descriptionKey: "facebook_desc",
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
    icon: "fab fa-facebook",
    url: "#"
  },
  {
    nameKey: "linkedin",
    subscribersKey: "linkedin_subscribers",
    descriptionKey: "linkedin_desc",
    color: "bg-blue-700",
    hoverColor: "hover:bg-blue-800",
    icon: "fab fa-linkedin",
    url: "#"
  }
];

const recentContent = [
  {
    platformKey: "youtube",
    icon: "fab fa-youtube",
    iconColor: "text-red-600",
    time: "2 days ago",
    titleKey: "youtube_content_title",
    descriptionKey: "youtube_content_desc"
  },
  {
    platformKey: "telegram",
    icon: "fab fa-telegram", 
    iconColor: "text-blue-500",
    time: "5 hours ago",
    titleKey: "telegram_content_title",
    descriptionKey: "telegram_content_desc"
  },
  {
    platformKey: "instagram",
    icon: "fab fa-instagram",
    iconColor: "text-purple-500", 
    time: "1 day ago",
    titleKey: "instagram_content_title",
    descriptionKey: "instagram_content_desc"
  }
];

export function SocialSection() {
  const { t } = useTranslation();

  return (
    <section id="social" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t("social_media_hub")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("social_media_hub_desc")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {socialPlatforms.map((platform, index) => (
            <Card 
              key={platform.nameKey} 
              className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={`${platform.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${platform.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t(platform.nameKey)}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{t(platform.subscribersKey)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{t(platform.descriptionKey)}</p>
                <Button 
                  asChild
                  className={`${platform.color} ${platform.hoverColor} text-white transition-all duration-300`}
                >
                  <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    {platform.nameKey === "instagram" ? t("follow") : 
                     platform.nameKey === "youtube" ? t("subscribe") : 
                     platform.nameKey === "facebook" ? t("follow") : 
                     platform.nameKey === "linkedin" ? t("follow") : t("join_channel")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Content Preview */}
        <Card className="p-8 animate-slide-up">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t("latest_content")}</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentContent.map((content, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <i className={`${content.icon} ${content.iconColor} mr-2`}></i>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {t(content.platformKey)} • {content.time}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t(content.titleKey)}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t(content.descriptionKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Card>

        {/* Font Awesome CDN */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </div>
    </section>
  );
}