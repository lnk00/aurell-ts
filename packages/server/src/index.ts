import { Hono } from 'hono';
import authHandlers from './features/auth';
import openbankingHandlers from './features/bankaccount/handlers';
import { corsMiddleware } from './features/core/middlewares/cors.middleware';
import { serviceMiddleware } from './features/core/middlewares/service.middleware';
import profileHandlers from './features/profile/handlers';
import { handleError } from './libs/error/error.lib';
import type { HonoContextType } from './types/context.type';

const app = new Hono<HonoContextType>();

const routes = app
	.use('*', serviceMiddleware)
	.use('*', corsMiddleware)
	.onError(handleError)
	.route('/api/auth', authHandlers)
	.route('/api/profile', profileHandlers)
	.route('/api/ob', openbankingHandlers);

export type AppType = typeof routes;
export default app;
