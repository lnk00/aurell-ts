import type { ObCoreService } from '../../services/ob-core/ob-core.service';

export class ObCoreMockService implements ObCoreService {
	async createUser(_: string) {
		return { obProviderUserId: 'test-ob-provider-user-id' };
	}

	async createDelegatedAuth(_: string, __: string) {
		return { delegatedAuthCode: 'test-delegated-auth-code' };
	}
}
