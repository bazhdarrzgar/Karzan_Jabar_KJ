import { TrendingUp, ArrowRight, DollarSign, Target, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ScrollAnimated, FloatingElement } from '../AnimatedSection';
import { AnimatedCounter } from '../AnimatedCounter';

interface TradingAccount {
  id: string;
  initialDeposit: number;
  finalBalance: number;
  percentageGain: number;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  image: string;
}

const tradingAccounts: TradingAccount[] = [
  {
    id: '2002009090',
    initialDeposit: 5000,
    finalBalance: 31900,
    percentageGain: 538,
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-green-600',
    accentColor: 'bg-emerald-500',
    image: '/images/trade-1.jpg'
  },
  {
    id: '2000697192',
    initialDeposit: 100,
    finalBalance: 11250,
    percentageGain: 11150,
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-indigo-600',
    accentColor: 'bg-blue-500',
    image: '/images/trade-2.jpg'
  },
  {
    id: '2002588689',
    initialDeposit: 250,
    finalBalance: 2500,
    percentageGain: 900,
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-600',
    accentColor: 'bg-purple-500',
    image: '/images/trade-3.jpg'
  }
];

export function TradeSection() {
  const { t } = useTranslation();

  return (
    <section id="trade" className="py-16 sm:py-20 md:py-24 lg:py-32 section-light bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement className="absolute -top-20 sm:-top-40 right-0 sm:-right-20" intensity={15} duration={7}>
          <div className="w-40 h-40 sm:w-60 md:w-96 sm:h-60 md:h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full blur-3xl"></div>
        </FloatingElement>
        <FloatingElement className="absolute -bottom-20 sm:-bottom-40 left-0 sm:-left-20" intensity={20} duration={9}>
          <div className="w-40 h-40 sm:w-60 md:w-96 sm:h-60 md:h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        </FloatingElement>
        <motion.div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollAnimated animation="fadeIn" className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.div
            className="inline-block mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 dark:from-green-500/20 dark:via-emerald-500/20 dark:to-teal-500/20 border border-green-500/20 dark:border-green-500/30 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">{t('trade_performance')}</span>
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400 animate-pulse" />
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 sm:mb-6 md:mb-8 px-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <span className="gradient-text leading-tight block">{t('real_trading_results')}</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {t('trade_section_description')}
          </motion.p>
        </ScrollAnimated>

        {/* Trading Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {tradingAccounts.map((account, index) => (
            <ScrollAnimated
              key={account.id}
              animation="scaleIn"
              delay={index * 0.2}
            >
              <Link href="/trade">
                <motion.div
                  className="group relative cursor-pointer"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                    {/* Card Image Area */}
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent z-10" />
                      <img
                        src={account.image}
                        alt={`Trading account ${account.id}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className={`${account.accentColor} rounded-full px-4 py-1.5 shadow-lg backdrop-blur-md bg-opacity-20 border border-white/50`}>
                          <span className="text-white text-sm font-bold flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            +{account.percentageGain}%
                          </span>
                        </div>
                      </div>

                      {/* Account Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <div className="flex items-center gap-2 mb-2 text-white/80">
                          <Target className="w-4 h-4" />
                          <span className="text-xs font-medium tracking-wider uppercase">{t('account')}</span>
                        </div>
                        <div className="text-3xl font-bold text-white font-mono tracking-tight">
                          {account.id}
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 relative">
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 transition-colors group-hover:bg-white dark:group-hover:bg-gray-800 shadow-sm">
                          <div className="flex items-center gap-1.5 mb-2 text-gray-500 dark:text-gray-400">
                            <DollarSign className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold uppercase tracking-wider">{t('initial_deposit')}</span>
                          </div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            ${account.initialDeposit.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 transition-colors shadow-sm">
                          <div className="flex items-center gap-1.5 mb-2 text-green-600 dark:text-green-400">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span className="text-xs font-semibold uppercase tracking-wider">{t('total_profit')}</span>
                          </div>
                          <div className="text-xl font-bold text-green-600 dark:text-green-400">
                            <span className="mr-0.5">$</span>
                            <AnimatedCounter
                              end={account.finalBalance - account.initialDeposit}
                              duration={2000}
                            />
                          </div>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <motion.button
                        className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${account.gradientFrom} ${account.gradientTo} flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300 group/btn`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{t('view_full_analysis')}</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>

                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${account.gradientFrom} ${account.gradientTo} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
                </motion.div>
              </Link>
            </ScrollAnimated>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollAnimated animation="fadeIn" delay={0.6}>
          <motion.div
            className="text-center mt-12 sm:mt-16 md:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6">
              {t('click_for_details')}
            </p>
            <Link href="/trade">
              <motion.button
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t('view_detailed_dashboard')}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </ScrollAnimated>
      </div>
    </section>
  );
}

export default TradeSection;
