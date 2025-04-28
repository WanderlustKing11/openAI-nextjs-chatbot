
// lib/rate-limiter.ts
import { redis } from './upstash'

export class RateLimiter {
    userKey: string
    maxPerHour = 60      // tweak as you like
    periodSeconds = 3600 // one hour

    constructor(userKey: string) {
        this.userKey = userKey
    }

    async consume() {
        // use the current hour as a sliding bucket
        const hour = new Date().getHours()
        const key = `chat_rl:${this.userKey}:${hour}`

        const count = await redis.incr(key)
        if (count === 1) {
            // first hit: set TTL
            await redis.expire(key, this.periodSeconds)
        }

        return count <= this.maxPerHour
    }
}
