import { Hono } from 'hono';
import type { Bindings } from '../../../bindings';
import { getService } from '../../../libs/ioc.lib';

const openbankingHandlers = new Hono<{ Bindings: Bindings }>().get(
	'/auth/delegate',
	async (c) => {
		const obCoreService = getService('obcore');

		const token = await obCoreService.createDelegatedAuth('', '');

		return c.json(
			{
				token,
			},
			200,
		);
	},
);

export default openbankingHandlers;
