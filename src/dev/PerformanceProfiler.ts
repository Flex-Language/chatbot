import { ProfileSession, ProfileSample, ProfileResult } from '../types/dev';

/**
 * Performance Profiler
 */
export class PerformanceProfiler {
    public startProfiling(session: ProfileSession): void {
        // Start collecting performance samples
        const interval = setInterval(() => {
            if (!session.isActive) {
                clearInterval(interval);
                return;
            }

            session.samples.push({
                timestamp: Date.now(),
                memoryUsage: process.memoryUsage(),
                cpuUsage: process.cpuUsage()
            });
        }, 100);
    }

    public stopProfiling(session: ProfileSession): ProfileResult {
        return {
            sessionName: session.name,
            duration: session.duration || 0,
            samples: session.samples,
            averageMemory: this.calculateAverageMemory(session.samples),
            memoryTrend: this.calculateMemoryTrend(session.samples),
            cpuUsage: this.calculateCpuUsage(session.samples)
        };
    }

    private calculateAverageMemory(samples: ProfileSample[]): number {
        if (samples.length === 0) { return 0; }
        const total = samples.reduce((sum, sample) => sum + sample.memoryUsage.heapUsed, 0);
        return total / samples.length;
    }

    private calculateMemoryTrend(samples: ProfileSample[]): 'increasing' | 'decreasing' | 'stable' {
        if (samples.length < 2) { return 'stable'; }
        const first = samples[0]?.memoryUsage.heapUsed || 0;
        const last = samples[samples.length - 1]?.memoryUsage.heapUsed || 0;
        const diff = first === 0 ? 0 : (last - first) / first;

        if (diff > 0.1) { return 'increasing'; }
        if (diff < -0.1) { return 'decreasing'; }
        return 'stable';
    }

    private calculateCpuUsage(samples: ProfileSample[]): number {
        if (samples.length === 0) { return 0; }
        // Simplified CPU usage calculation
        return Math.random() * 100; // Mock implementation
    }
} 