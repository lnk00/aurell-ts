import { stytchClient } from '@/libs/stytch.lib';
import type { SessionService } from '../session.service';

export class SessionStytchService implements SessionService {
	isUserAuthenticated() {
		const session = stytchClient.session.getSync();
		return !!session;
	}

	async revoke() {
		await stytchClient.session.revoke();
	}
}
