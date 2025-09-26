import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "../components/Navigation";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { CoursesSection } from "../components/sections/CoursesSection";
import { SocialSection } from "../components/sections/SocialSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { PartnershipSection } from "../components/sections/PartnershipSection";
import { ContactSection } from "../components/sections/ContactSection";
import { Footer } from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { ModernParticles } from "../components/ModernParticles";

export default function Home() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set text direction for RTL languages (Arabic and Kurdish)
    const rtlLanguages = ["ar", "ckb"];
    const isRTL = rtlLanguages.includes(i18n.language);
    
    // Update document direction
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    
    // Update document language attribute
    document.documentElement.lang = i18n.language;
    
    // Add a class to body for additional styling if needed
    document.body.classList.toggle('rtl-language', isRTL);
    
    console.log(`Language changed to: ${i18n.language}, RTL: ${isRTL}`);
  }, [i18n.language]);

  return (
    <>
      <Navigation />
      <ModernParticles count={25} />
      <main>
        <HeroSection />
        <AboutSection />
        <CoursesSection />
        <SocialSection />
        <ProjectsSection />
        <PartnershipSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}