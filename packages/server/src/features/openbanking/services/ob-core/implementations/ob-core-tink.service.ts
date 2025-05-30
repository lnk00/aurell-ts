import { injectable } from 'inversify';
import type { ObCoreService } from '../ob-core.service';
import type { Bindings } from '../../../../../types/context.type';
import { OpenbankingError } from '../../../../core/types/errors.type';

type AccessTokenScopes = 'user:create' | 'authorization:grant';

@injectable()
export class ObCoreTinkService implements ObCoreService {
	BASE_URL = 'https://api.tink.com/api/v1';

	env: Bindings;

	constructor(bindings: Bindings) {
		this.env = bindings;
	}

	async createUser(userId: string) {
		const access_token = await this.createAccessToken(['user:create']);

		const response = await fetch(`${this.BASE_URL}/user/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				Authorization: `Bearer ${access_token}`,
			},
			body: JSON.stringify({
				locale: 'en_US',
				market: 'FR',
				external_user_id: userId,
			}),
		});

		if (response.status === 409) {
			throw new OpenbankingError(
				'Could not create the user in Tink, the user already exist',
				409,
			);
		}

		const { user_id } = (await response.json()) as { user_id: string };

		return { obProviderUserId: user_id };
	}

	async createDelegatedAuth(userId: string, hint: string) {
		const access_token = await this.createAccessToken(['authorization:grant']);

		const params = new URLSearchParams();
		params.append('external_user_id', userId);
		params.append('id_hint', hint);
		params.append('actor_client_id', 'df05e4b379934cd09963197cc855bfe9');
		params.append(
			'scope',
			'credentials:read,credentials:refresh,credentials:write,providers:read,user:read,authorization:read',
		);

		const response = await fetch(
			`${this.BASE_URL}/oauth/authorization-grant/delegate`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${access_token}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: params,
			},
		);

		const { code } = (await response.json()) as { code: string };

		return { delegatedAuthCode: code };
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

		const { access_token } = (await response.json()) as {
			access_token: string;
		};

		return access_token;
	}
}
