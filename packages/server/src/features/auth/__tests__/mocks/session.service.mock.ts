import type { SessionService } from '../../services/session/session.service';

export class SessionMockService implements SessionService {
	async verifyJwt(_: string) {
		return {
			userId: 'test-user-id',
			sessionId: 'test-session-id',
		};
	}
}

export class SessionMockServiceVerifyJwtThrow implements SessionService {
	async verifyJwt(_: string) {
		return Promise.reject(new Error('Invalid JWT'));
	}
}
