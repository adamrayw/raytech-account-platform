type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, limit: number, windowSeconds: number) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || now > current.resetAt) {
    const resetAt = now + windowSeconds * 1000;
    buckets.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: limit - 1,
      retryAfter: windowSeconds,
    };
  }

  if (current.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((current.resetAt - now) / 1000));

    return {
      allowed: false,
      remaining: 0,
      retryAfter,
    };
  }

  current.count += 1;

  return {
    allowed: true,
    remaining: limit - current.count,
    retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}
