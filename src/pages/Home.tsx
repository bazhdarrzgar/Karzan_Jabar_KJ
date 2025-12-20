import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "../components/Navigation";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { TradeSection } from "../components/sections/TradeSection";
import { CoursesSection } from "../components/sections/CoursesSection";
import { SocialSection } from "../components/sections/SocialSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { PartnershipSection } from "../components/sections/PartnershipSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set text direction for RTL languages (Arabic and Kurdish)
    const rtlLanguages = ["ar", "ckb"];
    const isRTL = rtlLanguages.includes(i18n.language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
    document.body.classList.toggle('rtl-language', isRTL);
  }, [i18n.language]);

  return (
    <div className="relative min-h-screen bg-transparent transition-colors duration-500">
      <Navigation />

      <main className="relative">
        <HeroSection />
        <AboutSection />
        <TradeSection />
        <CoursesSection />
        <SocialSection />
        <ProjectsSection />
        <PartnershipSection />
        <ContactSection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}