import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

export const ratelimit = new Ratelimit({
  redis: kv,
  // 10 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});
