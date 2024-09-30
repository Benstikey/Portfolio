// File: lib/rate-limit.ts

export interface RateLimitConfig {
    interval: number;
    limit: number;
  }
  
  export function rateLimit({ interval, limit }: RateLimitConfig) {
    const cache = new Map();
  
    return {
      check: (key: string): boolean => {
        const now = Date.now();
        const windowStart = now - interval;
  
        const requestTimestamps = cache.get(key) || [];
        const requestsInWindow = requestTimestamps.filter((timestamp: number) => timestamp > windowStart);
  
        if (requestsInWindow.length >= limit) {
          return false;
        }
  
        requestsInWindow.push(now);
        cache.set(key, requestsInWindow);
  
        return true;
      }
    };
  }