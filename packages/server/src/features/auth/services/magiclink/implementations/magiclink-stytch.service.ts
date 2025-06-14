import { injectable } from 'inversify';
import * as stytch from 'stytch';
import type { Bindings } from '../../../../../types/context.type';
import { AuthError } from '../../../../core/types/errors.type';
import type { MagicLinkService } from '../magiclink.service';

@injectable()
export class MagicLinkStytchService implements MagicLinkService {
	env: Bindings;
	client: stytch.B2BClient;

	constructor(bindings: Bindings) {
		this.env = bindings;
		this.client = new stytch.B2BClient({
			project_id: this.env.STYTCH_PROJECT_ID,
			secret: this.env.STYTCH_SECRET,
		});
	}

	async sendEmail(email: string) {
		const resp = await this.client.magicLinks.email.discovery.send({
			email_address: email,
			//TODO: use env to set url
			discovery_redirect_url: `${this.env.CLIENT_URL}/auth/magiclink/authenticate`,
		});

		if (resp.status_code !== 200) {
			throw new AuthError(
				`Could not send magic link email, the provider returned en error: ${resp.status_code}`,
			);
		}
	}

	async verify(token: string) {
		const resp = await this.client.magicLinks.discovery.authenticate({
			discovery_magic_links_token: token,
		});

		if (resp.status_code !== 200) {
			throw new AuthError(
				`Could not verify the token, the provider returned en error: ${resp.status_code}`,
			);
		}

		return {
			token: resp.intermediate_session_token,
			orgs: resp.discovered_organizations.map((org) => ({
				id: org.organization?.organization_id || '',
				name: org.organization?.organization_name || '',
				logo: org.organization?.organization_logo_url || '',
			})),
		};
	}
}
