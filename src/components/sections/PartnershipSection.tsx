import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Check, Handshake, Shield, GraduationCap, UserPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ScrollAnimated } from "../../hooks/use-scroll-animation";

const benefits = [
  {
    titleKey: "competitive_spreads",
    descriptionKey: "competitive_spreads_desc"
  },
  {
    titleKey: "fast_execution",
    descriptionKey: "fast_execution_desc"
  },
  {
    titleKey: "personal_support", 
    descriptionKey: "personal_support_desc"
  },
  {
    titleKey: "exclusive_bonuses",
    descriptionKey: "exclusive_bonuses_desc"
  }
];

const partnershipBenefits = [
  {
    icon: Handshake,
    titleKey: "direct_partnership",
    descriptionKey: "direct_partnership_desc",
    bgColor: "bg-gold"
  },
  {
    icon: Shield,
    titleKey: "regulated_safe", 
    descriptionKey: "regulated_safe_desc",
    bgColor: "bg-navy"
  },
  {
    icon: GraduationCap,
    titleKey: "educational_support",
    descriptionKey: "educational_support_desc", 
    bgColor: "bg-gold"
  }
];

export function PartnershipSection() {
  const { t } = useTranslation();

  return (
    <section id="partnership" className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-gradient-to-br from-gold/15 to-blue-600/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-tl from-purple-500/15 to-pink-500/15 rounded-full blur-2xl animate-bounce"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimated animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 hover:scale-105 transition-transform duration-300">
            {t("official_partnership")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("official_partnership_desc")}
          </p>
        </ScrollAnimated>
        
        <ScrollAnimated animation="scaleIn" delay={400}>
          <Card className="p-8 lg:p-12 shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-0 hover:shadow-3xl transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollAnimated animation="slideInLeft" delay={200}>
                <div className="hover:scale-102 transition-transform duration-300">
                  {/* Enhanced JustMarkets branding */}
                  <div className="bg-navy rounded-2xl p-8 text-center mb-8 relative overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-blue-500/10 animate-pulse"></div>
                    <div className="text-4xl font-bold text-white mb-2 relative z-10">
                      JustMarkets
                    </div>
                    <div className="text-gold font-semibold relative z-10">
                      {t("official_partner")}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    {t("why_choose_justmarkets")}
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    {benefits.map((benefit, index) => (
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
                            {t(benefit.titleKey)}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300">{t(benefit.descriptionKey)}</p>
                        </div>
                      </ScrollAnimated>
                    ))}
                  </div>
                </div>
              </ScrollAnimated>
              
              <ScrollAnimated animation="slideInRight" delay={600}>
                <div className="hover:scale-103 transition-transform duration-300">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/30 to-blue-500/30 rounded-2xl blur-xl animate-pulse"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75" 
                      alt={t("certificate_img_alt")} 
                      loading="lazy"
                      decoding="async"
                      className="rounded-2xl shadow-lg w-full h-auto relative z-10 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button 
                      asChild
                      className="bg-gold hover:bg-gold-dark text-black px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <UserPlus className="mr-2 h-5 w-5" />
                        {t("open_account_now")}
                      </a>
                    </Button>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                      {t("broker_features")}
                    </p>
                  </div>
                </div>
              </ScrollAnimated>
            </div>
            
            {/* Partnership Benefits */}
            <ScrollAnimated animation="fadeInUp" delay={800} className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-12">
                {t("partnership_benefits")}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                {partnershipBenefits.map((benefit, index) => (
                  <ScrollAnimated 
                    key={index} 
                    animation="bounceIn" 
                    delay={index * 200}
                    className="text-center group hover:scale-110 transition-transform duration-300"
                  >
                    <div className={`${benefit.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-xl`}>
                      <benefit.icon className={`${benefit.bgColor === 'bg-gold' ? 'text-black' : 'text-gold'} text-2xl`} />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-gold transition-colors">
                      {t(benefit.titleKey)}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t(benefit.descriptionKey)}
                    </p>
                  </ScrollAnimated>
                ))}
              </div>
            </ScrollAnimated>
          </Card>
        </ScrollAnimated>
      </div>
    </section>
  );
}