import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileDropdownBackdrop = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkDropdownState = () => {
      // Check if any dropdown menu is open
      const openDropdown = document.querySelector('[data-state="open"][role="menu"]');
      setIsOpen(!!openDropdown);
    };

    // Use MutationObserver to detect dropdown state changes
    const observer = new MutationObserver(checkDropdownState);
    
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['data-state']
    });

    // Initial check
    checkDropdownState();

    return () => observer.disconnect();
  }, []);

  // Only show on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[55] pointer-events-none"
          style={{ touchAction: 'none' }}
        />
      )}
    </AnimatePresence>
  );
};

export default MobileDropdownBackdrop;
