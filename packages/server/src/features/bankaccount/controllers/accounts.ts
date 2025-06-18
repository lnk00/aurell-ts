import { factory } from '../../../libs/factory.lib';
import { getService } from '../../../libs/ioc.lib';

export const accountsController = factory.createHandlers(async (c) => {
	const userId = c.get('userId');
	const obAccountService = getService('obaccount');

	const accounts = await obAccountService.listAccounts(userId as string);

	return c.json({
		accounts,
	});
});
