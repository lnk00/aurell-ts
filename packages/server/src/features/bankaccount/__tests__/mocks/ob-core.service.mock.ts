import { OpenbankingError } from '../../../core/types/errors.type';
import type { ObCoreService } from '../../services/ob-core/ob-core.service';

type AccessTokenScopes = 'user:create' | 'authorization:grant';

export class ObCoreMockService implements ObCoreService {
	async getLinkCode(userId: string) {
		await this.createUser(userId);
		const { delegatedAuthCode } = await this.createDelegatedAuth(
			userId,
			'test-hint',
		);

		return { linkCode: delegatedAuthCode };
	}

	private async createUser(_: string) {
		await this.createAccessToken(['user:create']);
		return;
	}

	private async createDelegatedAuth(_: string, __: string) {
		await this.createAccessToken(['authorization:grant']);
		return { delegatedAuthCode: 'test-link-code' };
	}

	private async createAccessToken(_: AccessTokenScopes[]) {
		return 'test-access-token';
	}
}

export class ObCoreMockServiceCreateDelegatedAuthThrow
	implements ObCoreService
{
	async getLinkCode(userId: string) {
		await this.createUser(userId);
		await this.createDelegatedAuth(userId, 'test-hint');

		return { linkCode: '' };
	}

	private async createUser(_: string) {
		await this.createAccessToken(['user:create']);
		return;
	}

	private async createDelegatedAuth(_: string, __: string) {
		throw new OpenbankingError(
			'Could not delegate the tink auth to connected user',
		);
	}

	private async createAccessToken(_: AccessTokenScopes[]) {
		return 'test-access-token';
	}
}
