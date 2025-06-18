import { Hono } from 'hono';
import type { HonoContextType } from '../../types/context.type';
import { guardMiddleware } from '../auth/middlewares/guard.middleware';
import { accountsController } from './controllers/accounts';
import { linkCodeController } from './controllers/link/code.controller';

const bankaccountHandlers = new Hono<HonoContextType>()
	.use('*', guardMiddleware)
	.get('/link/code', ...linkCodeController)
	.get('/accounts', ...accountsController);

export default bankaccountHandlers;
