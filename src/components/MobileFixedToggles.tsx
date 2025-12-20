import { useState, useEffect } from "react";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

const MobileFixedToggles = () => {
  const [screenSize, setScreenSize] = useState("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setScreenSize("desktop");
      } else {
        setScreenSize("mobile");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!mounted || screenSize !== "mobile") return null;

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center z-[60] pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-4">
        {/* Language Toggle */}
        <div>
          <LanguageToggle isMobileView={true} instanceId="fixed-mobile" />
        </div>

        {/* Theme Toggle */}
        <div>
          <ThemeToggle isMobileView={true} instanceId="fixed-mobile" />
        </div>
      </div>
    </div>
  );
};

export default MobileFixedToggles;