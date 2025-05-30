import type { ObCoreService } from '../../services/ob-core/ob-core.service';

export class ObCoreMockService implements ObCoreService {
	async getLinkCode(_: string) {
		return { linkCode: 'test-link-code' };
	}
}
