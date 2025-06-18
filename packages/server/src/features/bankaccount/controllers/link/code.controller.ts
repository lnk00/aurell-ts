import { factory } from '../../../../libs/factory.lib';
import { getService } from '../../../../libs/ioc.lib';

export const linkCodeController = factory.createHandlers(async (c) => {
	const userId = c.get('userId');
	const obCoreService = getService('obcore');

	const { linkCode } = await obCoreService.getLinkCode(userId as string);

	return c.json(
		{
			code: linkCode,
		},
		200,
	);
});
