import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

export function ModernParticles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 2 + 0.5,
      direction: Math.random() * Math.PI * 2,
    }));
    setParticles(newParticles);
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => {
        const distanceToMouse = Math.sqrt(
          Math.pow(mousePosition.x - particle.x, 2) + Math.pow(mousePosition.y - particle.y, 2)
        );
        const isNearMouse = distanceToMouse < 150;

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-gold to-blue-500"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.x,
              top: particle.y,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
              scale: isNearMouse ? [1, 1.5, 1] : [1, 1.2, 1],
            }}
            transition={{
              duration: particle.speed + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {/* Connection lines between nearby particles */}
            {isNearMouse && (
              <motion.div
                className="absolute w-px bg-gradient-to-b from-gold/30 to-transparent"
                style={{
                  height: 100,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'top',
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 0.3 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}