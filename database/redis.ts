import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: config.env.upststack.redisUrl,
    token: config.env.upststack.redisToken,
})

export default redis;