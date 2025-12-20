import { useState, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface LazyImageProps extends Omit<HTMLMotionProps<"img">, "src"> {
    src: string;
    alt: string;
    className?: string;
    aspectRatio?: string; // e.g. "aspect-[4/5]" or "aspect-video"
    blurDataUrl?: string; // Optional base64 placeholder
}

export function LazyImage({
    src,
    alt,
    className,
    aspectRatio,
    blurDataUrl,
    ...props
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        // If no blur placeholder, we can just start loading the main image
        // But we still want the fade-in effect.
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setIsLoaded(true);

        };
    }, [src]);

    // Extract rounded class to apply to wrapper
    const roundedClass = className?.split(' ').find(c => c.includes('rounded')) || "rounded-xl";

    return (
        <div className={cn("relative overflow-hidden", aspectRatio, roundedClass)}>
            {/* Placeholder / Blur Image */}
            {blurDataUrl && !isLoaded && (
                <img
                    src={blurDataUrl}
                    alt={alt}
                    className={cn(
                        "absolute inset-0 w-full h-full object-cover filter blur-lg scale-110",
                        className
                    )}
                />
            )}

            {/* Main Image */}
            <motion.img
                src={src}
                alt={alt}
                className={cn(
                    "w-full h-full object-cover transition-opacity duration-700 ease-in-out",
                    isLoaded ? "opacity-100" : "opacity-0",
                    className
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                loading="eager"
                decoding="async"
                {...props}
            />

            {/* Loading Skeleton (if no blur placeholder and not loaded) */}
            {!isLoaded && !blurDataUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 animate-pulse">
                    <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
            )}
        </div>
    );
}
