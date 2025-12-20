import { motion } from "framer-motion";
import { TrendingUp, Zap, BarChart3, Activity } from "lucide-react";

export function BackgroundShapes() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Gradient orbs */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 rounded-full blur-[120px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -50, 0],
                    y: [0, -30, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-gold/5 rounded-full blur-[100px]"
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -30, 0],
                    y: [0, 50, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating icons */}
            <motion.div
                className="absolute top-[15%] left-[15%] text-blue-500/10 dark:text-blue-400/10"
                animate={{ y: [0, -20, 0], rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 7, repeat: Infinity }}
            >
                <TrendingUp size={120} />
            </motion.div>
            <motion.div
                className="absolute bottom-[20%] left-[10%] text-purple-500/10 dark:text-purple-400/10"
                animate={{ y: [0, 25, 0], rotate: [0, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 9, repeat: Infinity }}
            >
                <Zap size={100} />
            </motion.div>
            <motion.div
                className="absolute top-[40%] right-[15%] text-gold/10"
                animate={{ y: [0, -30, 0], rotate: [0, 20, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 11, repeat: Infinity }}
            >
                <BarChart3 size={90} />
            </motion.div>
            <motion.div
                className="absolute bottom-[40%] right-[5%] text-blue-500/10 dark:text-blue-400/10"
                animate={{ y: [0, 20, 0], rotate: [0, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 13, repeat: Infinity }}
            >
                <Activity size={80} />
            </motion.div>
        </div>
    );
}
