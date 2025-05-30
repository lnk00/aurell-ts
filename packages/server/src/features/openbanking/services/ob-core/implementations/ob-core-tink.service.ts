import { injectable } from 'inversify';
import type { ObCoreService } from '../ob-core.service';
import type { Bindings } from '../../../../../types/context.type';

type AccessTokenScopes = 'user:create' | 'authorization:grant';

@injectable()
export class ObCoreTinkService implements ObCoreService {
	BASE_URL = 'https://api.tink.com/api/v1';

	env: Bindings;

	constructor(bindings: Bindings) {
		this.env = bindings;
	}

	async createDelegatedAuth(userId: string, hint: string) {
		const access_token = await this.createAccessToken(['authorization:grant']);
		return access_token;
	}

	private async createAccessToken(scopes: AccessTokenScopes[]) {
		const params = new URLSearchParams();
		params.append('client_id', this.env.TINK_CLIENT_ID);
		params.append('client_secret', this.env.TINK_CLIENT_SECRET);
		params.append('grant_type', 'client_credentials');
		params.append('scope', scopes.join(','));

		const response = await fetch(`${this.BASE_URL}/oauth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: params,
		});

		const d = (await response.json()) as { access_token: string };
		return d.access_token;
	}
}
