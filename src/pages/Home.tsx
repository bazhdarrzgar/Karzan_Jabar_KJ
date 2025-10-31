import { useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "../components/Navigation";
import { HeroSection } from "../components/sections/HeroSection";
import { Footer } from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { ModernParticles } from "../components/ModernParticles";

// Lazy load sections for better performance
const AboutSection = lazy(() => import("../components/sections/AboutSection").then(m => ({ default: m.AboutSection })));
const CoursesSection = lazy(() => import("../components/sections/CoursesSection").then(m => ({ default: m.CoursesSection })));
const SocialSection = lazy(() => import("../components/sections/SocialSection").then(m => ({ default: m.SocialSection })));
const ProjectsSection = lazy(() => import("../components/sections/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const PartnershipSection = lazy(() => import("../components/sections/PartnershipSection").then(m => ({ default: m.PartnershipSection })));
const ContactSection = lazy(() => import("../components/sections/ContactSection").then(m => ({ default: m.ContactSection })));

const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
  </div>
);

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
  }, [i18n.language]);

  return (
    <>
      <Navigation />
      <ModernParticles count={15} />
      <main>
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CoursesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SocialSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PartnershipSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}