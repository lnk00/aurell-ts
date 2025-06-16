import { injectable } from 'inversify';
import type { ObAccountService } from '../ob-account.service';

@injectable()
export class ObAccountMockService implements ObAccountService {
	async listAccounts(_: string) {
		return [
			{
				number: 'test-account-number-1',
				name: 'test-account-name-1',
				balance: 1000,
			},
			{
				number: 'test-account-number-2',
				name: 'test-account-name-2',
				balance: 2000,
			},
			{
				number: 'test-account-number-3',
				name: 'test-account-name-3',
				balance: 3000,
			},
		];
	}
}
