import type { Context, Next } from 'hono';
import { initializeServices } from '../../../libs/ioc.lib';
import type { HonoContextType } from '../../../types/context.type';

export const serviceMiddleware = async (
	c: Context<HonoContextType>,
	next: Next,
) => {
	initializeServices(c.env);
	return next();
};
