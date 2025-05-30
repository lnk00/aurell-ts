import { Hono } from 'hono';
import { getService } from '../../../libs/ioc.lib';
import type { HonoContextType } from '../../../types/context.type';

const openbankingHandlers = new Hono<HonoContextType>().get(
	'/link/code',
	async (c) => {
		const userId = c.get('userId');
		const obCoreService = getService('obcore');

		const { linkCode } = await obCoreService.getLinkCode(userId as string);

		return c.json(
			{
				code: linkCode,
			},
			200,
		);
	},
);

export default openbankingHandlers;
