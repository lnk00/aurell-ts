import type { Context, Next } from 'hono';
import { cors } from 'hono/cors';
import type { HonoContextType } from '../../../types/context.type';

export const corsMiddleware = (c: Context<HonoContextType>, next: Next) => {
	const corsMiddlewareHandler = cors({
		origin: [c.env.CLIENT_URL, 'http://localhost:5173', 'https://aurell.app'],
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['POST', 'GET', 'OPTIONS'],
		exposeHeaders: ['Content-Length'],
		maxAge: 600,
		credentials: true,
	});

	return corsMiddlewareHandler(c, next);
};
