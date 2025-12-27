import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Check, Handshake, Shield, GraduationCap, UserPlus, TrendingUp, Award, Clock, DollarSign, Users, Globe, Star, Zap, Maximize2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ScrollAnimated } from "../../hooks/use-scroll-animation";
import { useState } from "react";
import { ImageLightbox } from "../ImageLightbox";
import { LazyImage } from "../ui/LazyImage";

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
    bgColor: "bg-gradient-to-br from-gold to-yellow-500"
  },
  {
    icon: Shield,
    titleKey: "regulated_safe",
    descriptionKey: "regulated_safe_desc",
    bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700"
  },
  {
    icon: GraduationCap,
    titleKey: "educational_support",
    descriptionKey: "educational_support_desc",
    bgColor: "bg-gradient-to-br from-purple-600 to-pink-600"
  }
];

const features = [
  {
    icon: TrendingUp,
    titleKey: "market_analysis_title",
    descriptionKey: "market_analysis_desc"
  },
  {
    icon: Award,
    titleKey: "certified_broker_title",
    descriptionKey: "certified_broker_desc"
  },
  {
    icon: Clock,
    titleKey: "support_24_7_title",
    descriptionKey: "support_24_7_desc"
  },
  {
    icon: DollarSign,
    titleKey: "no_hidden_fees_title",
    descriptionKey: "no_hidden_fees_desc"
  }
];

const stats = [
  { number: "3K+", label: "active_traders", icon: Users },
  { number: "150+", label: "countries_served", icon: Globe },
  { number: "4.9/5", label: "customer_rating", icon: Star },
  { number: "99.9%", label: "uptime", icon: Zap }
];

export function PartnershipSection() {
  const { t } = useTranslation();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      <section id="partnership" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent relative overflow-hidden">
        {/* Advanced animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-gold/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-5 sm:right-10 w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-96 sm:h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero Header */}
          <ScrollAnimated animation="fadeInUp" className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-gold/20 to-blue-600/20 rounded-full">
              <span className="text-sm sm:text-base font-semibold text-gold dark:text-gold">{t('official_partnership_badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {t("official_partnership")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              {t("official_partnership_desc")}
            </p>
          </ScrollAnimated>

          {/* Stats Section */}
          <ScrollAnimated animation="fadeInUp" delay={200} className="mb-12 sm:mb-16 lg:mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-gold">
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 text-gold" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t(stat.label)}</div>
                </Card>
              ))}
            </div>
          </ScrollAnimated>

          {/* Main Partnership Card */}
          <ScrollAnimated animation="scaleIn" delay={400}>
            <Card className="p-6 sm:p-8 lg:p-12 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:shadow-3xl transition-all duration-500 rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                {/* Left Column - JustMarkets Info */}
                <ScrollAnimated animation="slideInLeft" delay={200}>
                  <div>
                    {/* Enhanced JustMarkets branding */}
                    <div className="bg-gradient-to-br from-navy via-blue-900 to-navy rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center mb-6 sm:mb-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/20 via-blue-500/20 to-gold/20 animate-pulse"></div>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                      </div>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 relative z-10">
                        JustMarkets
                      </div>
                      <div className="text-gold text-base sm:text-lg font-semibold relative z-10 flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                        {t("official_partner")}
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                      {t("why_choose_justmarkets")}
                    </h3>

                    {/* Benefits List */}
                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      {benefits.map((benefit, index) => (
                        <ScrollAnimated
                          key={index}
                          animation="slideInLeft"
                          delay={index * 100}
                          className="flex items-start group hover:translate-x-2 transition-transform bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-xl hover:bg-gold/10 dark:hover:bg-gold/10"
                        >
                          <div className="bg-gradient-to-br from-gold to-yellow-500 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center mr-3 sm:mr-4 mt-1 group-hover:scale-110 transition-transform flex-shrink-0 shadow-md">
                            <Check className="text-black text-sm sm:text-base" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white group-hover:text-gold transition-colors">
                              {t(benefit.titleKey)}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">{t(benefit.descriptionKey)}</p>
                          </div>
                        </ScrollAnimated>
                      ))}
                    </div>

                    {/* Additional Features Grid - Hidden on mobile to save space */}
                    <div className="hidden sm:grid grid-cols-2 gap-3 sm:gap-4">
                      {features.map((feature, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-3 sm:p-4 rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gold group">
                          <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gold mb-2 group-hover:scale-110 transition-transform" />
                          <h5 className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white mb-1">{t(feature.titleKey)}</h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{t(feature.descriptionKey)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimated>

                {/* Right Column - Image & CTA */}
                <ScrollAnimated animation="slideInRight" delay={600}>
                  <div className="space-y-6 sm:space-y-8">
                    {/* Certificate Image */}
                    <div className="relative group cursor-pointer z-20" onClick={() => setIsLightboxOpen(true)}>
                      <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-gold/40 via-blue-500/40 to-purple-500/40 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                        <LazyImage
                          src="/images/certificate_karzan.png"
                          alt={t("certificate_img_alt")}
                          className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileHover={{ opacity: 1, scale: 1 }}
                            className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30"
                          >
                            <Maximize2 className="text-white w-8 h-8" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-2 border-gray-200 dark:border-gray-700 hover:border-gold transition-colors duration-300">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{t('ready_to_start_trading')}</h4>
                      <Button
                        asChild
                        className="w-full sm:w-auto bg-gradient-to-r from-gold via-yellow-500 to-gold hover:from-yellow-600 hover:via-gold hover:to-yellow-600 text-black px-6 sm:px-10 py-4 sm:py-6 text-base sm:text-lg font-bold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl rounded-xl"
                      >
                        <a href="https://one.justmarkets.link/a/u96yg02l2i/registration/trader" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                          <UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />
                          {t("open_account_now")}
                        </a>
                      </Button>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3 sm:mt-4 flex items-center justify-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        {t("broker_features")}
                      </p>
                    </div>
                  </div>
                </ScrollAnimated>
              </div>

              {/* Partnership Benefits Section */}
              <ScrollAnimated animation="fadeInUp" delay={800} className="mt-12 sm:mt-16 lg:mt-20 pt-12 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8 sm:mb-12">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    {t("partnership_benefits")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                    {t('unlock_exclusive_advantages')}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {partnershipBenefits.map((benefit, index) => (
                    <ScrollAnimated
                      key={index}
                      animation="bounceIn"
                      delay={index * 200}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-purple-500/20 rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Card className="relative p-6 sm:p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gold rounded-2xl sm:rounded-3xl h-full">
                        <div className={`${benefit.bgColor} rounded-2xl sm:rounded-3xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl`}>
                          <benefit.icon className="text-white text-2xl sm:text-3xl" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-gold transition-colors">
                          {t(benefit.titleKey)}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {t(benefit.descriptionKey)}
                        </p>
                      </Card>
                    </ScrollAnimated>
                  ))}
                </div>
              </ScrollAnimated>

              {/* Trust Badges */}
              <ScrollAnimated animation="fadeInUp" delay={1000} className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-full">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{t('ssl_secured')}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-full">
                    <Award className="w-4 h-4 text-gold" />
                    <span className="font-medium">{t('certified_partner')}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 sm:px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{t('award_winning')}</span>
                  </div>
                </div>
              </ScrollAnimated>
            </Card>
          </ScrollAnimated>
        </div >
      </section >

      <ImageLightbox
        src="/images/certificate_karzan.png"
        alt={t("certificate_img_alt")}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}