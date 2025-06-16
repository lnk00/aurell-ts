import * as stytch from 'stytch';
import type { Bindings } from '../../../../../types/context.type';
import { AuthError } from '../../../../../types/errors.type';
import type { OrgService } from '../org.service';

export class OrgStytchService implements OrgService {
	env: Bindings;
	client: stytch.B2BClient;

	constructor(bindings: Bindings) {
		this.env = bindings;
		this.client = new stytch.B2BClient({
			project_id: this.env.STYTCH_PROJECT_ID,
			secret: this.env.STYTCH_SECRET,
		});
	}

	async create(name: string, intermediateToken: string) {
		const resp = await this.client.discovery.organizations.create({
			organization_name: name,
			organization_slug: name.toLowerCase().replace(/\s+/g, '-'),
			intermediate_session_token: intermediateToken,
		});

		if (resp.status_code !== 200) {
			throw new AuthError(
				`Could not create the organizations ${name}, the provider returned en error: ${resp.status_code}`,
			);
		}

		return { sessionToken: resp.session_token, sessionJwt: resp.session_jwt };
	}

	async signin(id: string, intermediateToken: string) {
		const resp = await this.client.discovery.intermediateSessions.exchange({
			organization_id: id,
			intermediate_session_token: intermediateToken,
		});

		if (resp.status_code !== 200) {
			throw new AuthError(
				`Could not sign the user in the organizations ${id}, the provider returned en error: ${resp.status_code}`,
			);
		}

		return { sessionToken: resp.session_token, sessionJwt: resp.session_jwt };
	}
}
