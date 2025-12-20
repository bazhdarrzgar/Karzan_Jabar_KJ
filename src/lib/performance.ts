/**
 * Simple performance monitoring utility
 */
export const reportPerformance = () => {
    if (process.env.NODE_ENV === 'development') {
        if ('performance' in window && 'getEntriesByType' in performance) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const paintMetrics = performance.getEntriesByType('paint');
                    paintMetrics.forEach((metric) => {
                        console.log(`[Performance] ${metric.name}: ${metric.startTime.toFixed(2)}ms`);
                    });

                    const navigationMetrics = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
                    if (navigationMetrics) {
                        console.log(`[Performance] Load Time: ${navigationMetrics.loadEventEnd.toFixed(2)}ms`);
                        console.log(`[Performance] DOM Ready: ${navigationMetrics.domContentLoadedEventEnd.toFixed(2)}ms`);
                    }
                }, 0);
            });
        }
    }
};
