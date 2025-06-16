import { injectable } from 'inversify';
import * as stytch from 'stytch';
import type { Bindings } from '../../../../../types/context.type';
import type { SessionService } from '../session.service';

@injectable()
export class SessionStytchService implements SessionService {
	env: Bindings;
	client: stytch.B2BClient;

	constructor(bindings: Bindings) {
		this.env = bindings;
		this.client = new stytch.B2BClient({
			project_id: this.env.STYTCH_PROJECT_ID,
			secret: this.env.STYTCH_SECRET,
		});
	}

	async verifyJwt(token: string) {
		const { member_session, session_jwt } =
			await this.client.sessions.authenticateJwt({
				session_jwt: token,
			});

		return {
			userId: member_session.member_id,
			sessionId: member_session.member_session_id,
			sessionJwt: session_jwt,
		};
	}

	async signOut(token: string) {
		await this.client.sessions.revoke({ session_token: token });
	}
}
