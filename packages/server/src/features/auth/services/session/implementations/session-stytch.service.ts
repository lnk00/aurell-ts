import { injectable } from 'inversify';
import type { Bindings } from '../../../../../bindings';
import type { SessionService } from '../session.service';
import * as stytch from 'stytch';

@injectable()
export class SessionStytchService implements SessionService {
	env: Bindings;

	constructor(bindings: Bindings) {
		this.env = bindings;
	}

	async verifyJwt(token: string) {
		const stytchClient = new stytch.Client({
			project_id: this.env.STYTCH_PROJECT_ID,
			secret: this.env.STYTCH_SECRET,
		});
		await stytchClient.sessions.authenticateJwt({
			session_jwt: token,
		});
	}
}
