import { Hono } from 'hono';
import { getService } from '../../../libs/ioc.lib';
import type { HonoContextType } from '../../../types/context.type';

const openbankingHandlers = new Hono<HonoContextType>().get(
	'/auth/delegate',
	async (c) => {
		const userId = c.get('userId');
		const obCoreService = getService('obcore');

		const token = await obCoreService.createDelegatedAuth(userId as string, '');

		return c.json(
			{
				token,
			},
			200,
		);
	},
);

export default openbankingHandlers;
