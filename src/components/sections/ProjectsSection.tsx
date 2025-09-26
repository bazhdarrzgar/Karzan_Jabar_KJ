import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollAnimated } from "../../hooks/use-scroll-animation";

const projectFeatures = [
  {
    titleKey: "educational_content_library",
    descriptionKey: "educational_content_library_desc"
  },
  {
    titleKey: "community_platform", 
    descriptionKey: "community_platform_desc"
  },
  {
    titleKey: "trading_tools_analytics",
    descriptionKey: "trading_tools_analytics_desc"
  }
];

const statistics = [
  { value: "500+", labelKey: "students_trained" },
  { value: "85%", labelKey: "success_rate" },
  { value: "50+", labelKey: "countries_reached" },
  { value: "24/7", labelKey: "support_available" }
];

export function ProjectsSection() {
  const { t } = useTranslation();

  const handleScrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-gold/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 left-10 w-48 h-48 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-bounce"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimated animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("my_work_projects")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("discover_initiatives")}
          </p>
        </ScrollAnimated>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollAnimated animation="slideInLeft" delay={200}>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t("kj_project_title")}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t("kj_project_description")}
              </p>
              
              <div className="space-y-4 mb-8">
                {projectFeatures.map((feature, index) => (
                  <ScrollAnimated 
                    key={index} 
                    animation="slideInLeft" 
                    delay={index * 100}
                    className="flex items-start group hover:translate-x-2 transition-transform"
                  >
                    <div className="bg-gold rounded-full w-6 h-6 flex items-center justify-center mr-4 mt-1 group-hover:scale-110 transition-transform">
                      <Check className="text-black text-sm" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-gold transition-colors">
                        {t(feature.titleKey)}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">{t(feature.descriptionKey)}</p>
                    </div>
                  </ScrollAnimated>
                ))}
              </div>
              
              <Button 
                onClick={handleScrollToContact}
                className="bg-gold hover:bg-gold-dark text-black px-8 py-3 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {t("learn_more")}
              </Button>
            </div>
          </ScrollAnimated>
          
          <ScrollAnimated animation="slideInRight" delay={400}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=626&q=80" 
                alt={t("financial_success_img_alt")} 
                className="rounded-2xl shadow-2xl w-full h-auto relative z-10 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </ScrollAnimated>
        </div>
        
        {/* Enhanced Project Statistics */}
        <ScrollAnimated animation="zoomIn" delay={600}>
          <Card className="p-8 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl border-0 hover:shadow-3xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {t("project_impact")}
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <ScrollAnimated 
                  key={index} 
                  animation="bounceIn" 
                  delay={index * 100}
                  className="text-center group hover:scale-110 transition-transform duration-300"
                >
                  <div className="text-4xl font-bold text-gold mb-2 group-hover:text-gold-dark transition-colors">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-semibold">
                    {t(stat.labelKey)}
                  </p>
                </ScrollAnimated>
              ))}
            </div>
          </Card>
        </ScrollAnimated>
      </div>
    </section>
  );
}