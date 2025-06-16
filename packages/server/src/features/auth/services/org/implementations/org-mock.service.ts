import type { OrgService } from '../org.service';

export class OrgMockService implements OrgService {
	async create(_: string, __: string) {
		return {
			sessionToken: 'test-session-token',
			sessionJwt: 'test-session-jwt',
		};
	}

	async signin(_: string, __: string) {
		return {
			sessionToken: 'test-session-token',
			sessionJwt: 'test-session-jwt',
		};
	}
}
