import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; 

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, "1m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;