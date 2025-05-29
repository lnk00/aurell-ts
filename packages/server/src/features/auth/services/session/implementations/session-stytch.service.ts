import { injectable } from 'inversify';
import type { Bindings } from '../../../../../bindings';
import type { SessionService } from '../session.service';
import * as stytch from 'stytch';

@injectable()
export class SessionStytchService implements SessionService {
	env: Bindings;
	client: stytch.Client;

	constructor(bindings: Bindings) {
		this.env = bindings;
		this.client = new stytch.Client({
			project_id: this.env.STYTCH_PROJECT_ID,
			secret: this.env.STYTCH_SECRET,
		});
	}

	async verifyJwt(token: string) {
		await this.client.sessions.authenticateJwt({
			session_jwt: token,
		});
	}
}
