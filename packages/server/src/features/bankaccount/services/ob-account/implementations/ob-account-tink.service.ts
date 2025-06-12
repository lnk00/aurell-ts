import { injectable } from 'inversify';
import { getService } from '../../../../../libs/ioc.lib';
import type { Bindings } from '../../../../../types/context.type';
import type { ObCoreService } from '../../ob-core/ob-core.service';
import type { ObAccountService } from '../ob-account.service';

@injectable()
export class ObAccountTinkService implements ObAccountService {
	BASE_URL = 'https://api.tink.com/api/v1';
	obCoreService: ObCoreService;

	env: Bindings;

	constructor(bindings: Bindings) {
		this.env = bindings;
		this.obCoreService = getService('obcore');
	}

	async listAccounts(userId: string) {
		const d = await this.obCoreService.getUserAccessToken(userId);
		const r = await fetch(`${this.BASE_URL}/accounts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization: `Bearer ${d.token}`,
			},
		});

		const data = (await r.json()) as {
			accountNumber: string;
			name: string;
			balance: number;
		}[];

		return data
			.filter((account) => account.balance > 0 && account.name)
			.map((account) => ({
				number: account.accountNumber,
				name: account.name,
				balance: account.balance,
			}));
	}
}
