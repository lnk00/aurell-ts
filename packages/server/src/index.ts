import { Hono } from 'hono';
import authHandlers from './features/auth';
import bankaccountHandlers from './features/bankaccount';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';
import { serviceMiddleware } from './features/core/middlewares/service.middleware';
import profileHandlers from './features/profile/handlers';
import { handleError } from './libs/error/error.lib';
import type { HonoContextType } from './types/context.type';

const app = new Hono<HonoContextType>();

const routes = app
	.use('*', serviceMiddleware)
	.use('*', corsMiddleware)
	.route('/api/auth', authHandlers)
	.route('/api/profile', profileHandlers)
	.route('/api/ob', bankaccountHandlers)
	.onError(handleError);

export type AppType = typeof routes;
export default app;
