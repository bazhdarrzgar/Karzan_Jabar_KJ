import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CRITICAL_IMAGES = [
    '/images/karzan.jpg',
    '/images/project.jpg',
    '/images/trade-1.jpg',
    '/images/KJM_logo.jpg',
    '/images/certificate_karzan.png',
];

export function GlobalPreloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let loadedCount = 0;
        const totalImages = CRITICAL_IMAGES.length;

        if (totalImages === 0) {
            setIsLoading(false);
            return;
        }

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 5000); // Max 5 seconds wait

        CRITICAL_IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                setProgress((loadedCount / totalImages) * 100);
                if (loadedCount === totalImages) {
                    // Small delay for smooth transition
                    setTimeout(() => {
                        setIsLoading(false);
                        clearTimeout(timeoutId);
                    }, 500);
                }
            };
            img.onerror = () => {
                loadedCount++;
                setProgress((loadedCount / totalImages) * 100);
                if (loadedCount === totalImages) {
                    setTimeout(() => {
                        setIsLoading(false);
                        clearTimeout(timeoutId);
                    }, 500);
                }
            };
        });

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-white dark:bg-gray-950 flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background decorative elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.1, 0.3, 0.1],
                                x: [0, 50, 0],
                                y: [0, 30, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"
                        />
                        <motion.div
                            animate={{
                                scale: [1.5, 1, 1.5],
                                opacity: [0.1, 0.3, 0.1],
                                x: [0, -50, 0],
                                y: [0, -30, 0]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8">
                        {/* Logo or Brand Icon */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            className="mb-12"
                        >
                            <div className="relative group">
                                <div className="w-28 h-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(79,70,229,0.3)] overflow-hidden">
                                    <Sparkles className="w-14 h-14 text-white" />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
                                        animate={{
                                            x: ['-100%', '100%'],
                                            y: ['-100%', '100%']
                                        }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    />
                                </div>
                                <motion.div
                                    className="absolute -inset-6 border border-blue-500/10 rounded-[2.5rem]"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute -inset-10 border border-purple-500/5 rounded-[3rem]"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </motion.div>

                        {/* Brand Name */}
                        <div className="text-center mb-12">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-[0.2em]"
                            >
                                KARZAN JABAR
                            </motion.h1>
                            <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-[0.3em] uppercase"
                            >
                                Financial Expert
                            </motion.p>
                        </div>

                        {/* Progress Section */}
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                    Loading Assets
                                </span>
                                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                            <div className="w-full h-1 bg-gray-100 dark:bg-gray-800/50 rounded-full overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>
                            <motion.p
                                className="text-center text-[11px] font-medium text-gray-400 dark:text-gray-500 italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {progress < 30 && "Initializing secure connection..."}
                                {progress >= 30 && progress < 70 && "Downloading premium assets..."}
                                {progress >= 70 && progress < 100 && "Optimizing visual experience..."}
                                {progress === 100 && "Ready to explore."}
                            </motion.p>
                        </div>
                    </div>

                    {/* Bottom Status */}
                    <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                                System Operational
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
