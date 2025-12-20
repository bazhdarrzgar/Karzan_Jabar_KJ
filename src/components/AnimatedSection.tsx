import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
}

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "backOut" }
    }
  }
};

export function AnimatedSection({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6
}: AnimatedSectionProps) {
  const ref = useRef(null);

  const variants = {
    ...animationVariants[animation],
    visible: {
      ...animationVariants[animation].visible,
      transition: {
        ...animationVariants[animation].visible.transition,
        duration,
        delay: delay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="visible"
      animate="visible"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger children animation
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1
}: StaggerContainerProps) {
  const ref = useRef(null);
  // const isInView = useInView(ref, { amount: 0.1, once: true }); // Removed unused variable

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="visible"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ScrollAnimated component - alias for AnimatedSection with scroll animation
export const ScrollAnimated = AnimatedSection;

// Floating animation for decorative elements
export function FloatingElement({
  children,
  className = '',
  intensity = 10,
  duration = 3
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-intensity, intensity, -intensity],
        x: [-intensity / 2, intensity / 2, -intensity / 2]
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity
      }}
    >
      {children}
    </motion.div>
  );
}