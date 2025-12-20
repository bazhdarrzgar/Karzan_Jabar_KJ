import { useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import Navigation from "../components/Navigation";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection"; // Eagerly load for faster initial view
import { Footer } from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

// Lazy load remaining sections
const TradeSection = lazy(() => import("../components/sections/TradeSection").then(m => ({ default: m.TradeSection })));
const CoursesSection = lazy(() => import("../components/sections/CoursesSection").then(m => ({ default: m.CoursesSection })));
const SocialSection = lazy(() => import("../components/sections/SocialSection").then(m => ({ default: m.SocialSection })));
const ProjectsSection = lazy(() => import("../components/sections/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const PartnershipSection = lazy(() => import("../components/sections/PartnershipSection").then(m => ({ default: m.PartnershipSection })));
const ContactSection = lazy(() => import("../components/sections/ContactSection").then(m => ({ default: m.ContactSection })));

// Premium Loader
const SectionLoader = () => (
  <div className="flex items-center justify-center py-32">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 blur-lg bg-blue-500/20 rounded-full animate-pulse"></div>
    </div>
  </div>
);

export default function Home() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set text direction for RTL languages (Arabic and Kurdish)
    const rtlLanguages = ["ar", "ckb"];
    const isRTL = rtlLanguages.includes(i18n.language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
    document.body.classList.toggle('rtl-language', isRTL);

    // PRELOAD: Start loading lazy sections immediately after mount
    // This ensures they are ready before the user scrolls to them
    const preloadSections = () => {
      import("../components/sections/TradeSection");
      import("../components/sections/CoursesSection");
      import("../components/sections/SocialSection");
      import("../components/sections/ProjectsSection");
      import("../components/sections/PartnershipSection");
      import("../components/sections/ContactSection");
    };

    // Small delay to prioritize Hero/About rendering
    const timer = setTimeout(preloadSections, 1000);
    return () => clearTimeout(timer);
  }, [i18n.language]);

  return (
    <div className="relative min-h-screen bg-transparent transition-colors duration-500">
      <Navigation />

      <main className="relative">
        {/* Critical Sections (Eagerly Loaded) */}
        <HeroSection />
        <AboutSection />

        {/* Dynamic Sections (Lazy Loaded with Preload) */}
        <Suspense fallback={<SectionLoader />}>
          <TradeSection />
          <CoursesSection />
          <SocialSection />
          <ProjectsSection />
          <PartnershipSection />
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}