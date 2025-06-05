import { stytchClient } from '@/libs/stytch.lib';
import { injectable } from 'inversify';
import type { SessionService } from '../session.service';

@injectable()
export class SessionStytchService implements SessionService {
	isUserAuthenticated() {
		const session = stytchClient.session.getSync();
		return !!session;
	}

	async revoke() {
		await stytchClient.session.revoke();
	}
}
