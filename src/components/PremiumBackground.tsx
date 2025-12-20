import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const PremiumBackground: React.FC = () => {
    // Generate random paths for flowing curves
    const curves = useMemo(() => {
        return Array.from({ length: 5 }).map((_, i) => {
            const startY = 20 + i * 15;
            const endY = startY + (Math.random() - 0.5) * 20;
            const controlX1 = 30 + Math.random() * 20;
            const controlY1 = startY + (Math.random() - 0.5) * 40;
            const controlX2 = 50 + Math.random() * 20;
            const controlY2 = endY + (Math.random() - 0.5) * 40;

            return {
                id: i,
                d: `M -10 ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, 110 ${endY}`,
                duration: 15 + Math.random() * 10,
                delay: i * 2,
            };
        });
    }, []);

    // Generate random nodes
    const nodes = useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2,
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 5,
        }));
    }, []);

    // Generate connections between nodes
    const connections = useMemo(() => {
        const lines = [];
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = Math.sqrt(
                    Math.pow(nodes[i].x - nodes[j].x, 2) + Math.pow(nodes[i].y - nodes[j].y, 2)
                );
                if (dist < 25) {
                    lines.push({
                        id: `${i}-${j}`,
                        x1: nodes[i].x,
                        y1: nodes[i].y,
                        x2: nodes[j].x,
                        y2: nodes[j].y,
                    });
                }
            }
        }
        return lines;
    }, [nodes]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
                className="w-full h-full opacity-20 dark:opacity-40"
            >
                <defs>
                    <linearGradient id="purpleBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="0.5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Flowing Curves */}
                {curves.map((curve) => (
                    <motion.path
                        key={curve.id}
                        d={curve.d}
                        fill="none"
                        stroke="url(#purpleBlue)"
                        strokeWidth="0.1"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 1, 0],
                            opacity: [0, 0.4, 0.4, 0],
                            x: [-2, 2, -2]
                        }}
                        transition={{
                            duration: curve.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: curve.delay,
                        }}
                    />
                ))}

                {/* Connections */}
                {connections.map((line) => (
                    <motion.line
                        key={line.id}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="url(#purpleBlue)"
                        strokeWidth="0.05"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.2, 0] }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}

                {/* Nodes */}
                {nodes.map((node) => (
                    <motion.circle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r={node.size * 0.1}
                        fill="url(#purpleBlue)"
                        filter="url(#glow)"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.2, 0],
                        }}
                        transition={{
                            duration: node.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: node.delay,
                        }}
                    />
                ))}
            </svg>

            {/* Radial Gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
        </div>
    );
};
