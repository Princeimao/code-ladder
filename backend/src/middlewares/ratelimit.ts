import { rateLimit } from 'express-rate-limit'
import { RedisStore } from 'rate-limit-redis'
import client from '../config/redis.config.js'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    
	store: new RedisStore({
		sendCommand: (...args: string[]) => client.sendCommand(args),
	}),
})

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: "Too many requests, please try again later",

	store: new RedisStore({
		sendCommand: (...args: string[]) => client.sendCommand(args),
	}),
})

export { apiLimiter, authLimiter }