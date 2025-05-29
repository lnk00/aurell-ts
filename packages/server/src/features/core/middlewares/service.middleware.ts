import type { Context, Next } from 'hono';
import type { Bindings } from '../../../bindings';
import { initializeServices } from '../../../libs/ioc.lib';

export const serviceMiddleware = async (
	c: Context<{ Bindings: Bindings }>,
	next: Next,
) => {
	initializeServices(c.env);
	return next();
};
