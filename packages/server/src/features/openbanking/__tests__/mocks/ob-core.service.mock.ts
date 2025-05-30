import type { ObCoreService } from '../../services/ob-core/ob-core.service';

export class ObCoreMockService implements ObCoreService {
	async createDelegatedAuth(_: string, __: string) {
		return 'test-delegated-auth-token';
	}
}
