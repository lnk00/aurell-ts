import { Hono } from 'hono';
import { getService } from '../../../libs/ioc.lib';
import type { HonoContextType } from '../../../types/context.type';

const openbankingHandlers = new Hono<HonoContextType>()
	.post('/user/create', async (c) => {
		const userId = c.get('userId');
		const obCoreService = getService('obcore');

		const { obProviderUserId } = await obCoreService.createUser(
			userId as string,
		);

		return c.json(
			{
				obProviderUserId,
			},
			200,
		);
	})
	.get('/user/delegateAuth', async (c) => {
		const userId = c.get('userId');
		const obCoreService = getService('obcore');

		const { delegatedAuthCode } = await obCoreService.createDelegatedAuth(
			userId as string,
			'dams',
		);

		return c.json(
			{
				code: delegatedAuthCode,
			},
			200,
		);
	});

export default openbankingHandlers;
