import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';

export interface ScrollAnimationConfig {
  amount?: number;
  triggerOnce?: boolean;
  margin?: string;
  delay?: number;
  duration?: number;
}

// Predefined animation variants
export const scrollAnimations = {
  fadeIn: {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  },
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  fadeInDown: {
    hidden: {
      opacity: 0,
      y: -60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  fadeInLeft: {
    hidden: {
      opacity: 0,
      x: -80
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  fadeInRight: {
    hidden: {
      opacity: 0,
      x: 80
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  zoomIn: {
    hidden: {
      opacity: 0,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  },
  rotateIn: {
    hidden: {
      opacity: 0,
      rotate: -180,
      scale: 0.5
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "backOut"
      }
    }
  },
  slideInLeft: {
    hidden: {
      opacity: 0,
      x: -100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  slideInRight: {
    hidden: {
      opacity: 0,
      x: 100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  },
  bounceIn: {
    hidden: {
      opacity: 0,
      scale: 0.3
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 300,
        duration: 0.8
      }
    }
  },
  flipIn: {
    hidden: {
      opacity: 0,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  },
  staggerItem: {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }
};

// Custom hook for scroll animations
export function useScrollAnimation(
  animationType: keyof typeof scrollAnimations = 'fadeInUp',
  config: ScrollAnimationConfig = {}
) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    amount: config.amount || 0.1,
    once: config.triggerOnce ?? true,
    margin: (config.margin || "0px 0px -100px 0px") as any
  });

  const controls = useAnimation();

  useEffect(() => {
    const delay = config.delay || 0;
    setTimeout(() => {
      controls.start('visible');
    }, delay);
  }, [controls, config.delay]);

  return {
    ref,
    animate: controls,
    initial: 'visible',
    variants: scrollAnimations[animationType],
    isInView
  };
}

// Enhanced scroll animation component
interface ScrollAnimatedProps {
  children: React.ReactNode;
  animation?: keyof typeof scrollAnimations;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
  triggerOnce?: boolean;
  margin?: string;
  customVariants?: Variants;
}

export function ScrollAnimated({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className = '',
  amount = 0.1,
  triggerOnce = true,
  margin = "0px 0px -50px 0px",
  customVariants
}: ScrollAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);

  const variants = customVariants || {
    ...scrollAnimations[animation],
    visible: {
      ...scrollAnimations[animation].visible,
      transition: {
        ...scrollAnimations[animation].visible.transition,
        duration,
        delay
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

// Stagger animation for lists
interface StaggerAnimationProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  itemAnimation?: keyof typeof scrollAnimations;
}

export function StaggerAnimation({
  children,
  className = '',
  staggerDelay = 0.1,
  itemAnimation = 'fadeInUp'
}: StaggerAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

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

  const itemVariants = scrollAnimations[itemAnimation];

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="visible"
      animate="visible"
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Parallax scroll animation
export function useParallaxScroll(speed: number = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}

// Enhanced reveal animation for text
export const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    skewY: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Number counting animation with intersection observer
export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const currentCount = start + (end - start) * easedProgress;
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isVisible, start, end, duration]);

  return { count, ref, isVisible };
}