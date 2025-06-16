import { injectable } from 'inversify';
import { OpenbankingError } from '../../../../../types/errors.type';
import type { ObCoreService } from '../ob-core.service';

type AccessTokenScopes = 'user:create' | 'authorization:grant';

@injectable()
export class ObCoreMockService implements ObCoreService {
	async getLinkCode(userId: string) {
		await this.createUser(userId);
		const { delegatedAuthCode } = await this.createDelegatedAuth(
			userId,
			'test-hint',
		);

		return { linkCode: delegatedAuthCode };
	}

	async getUserAccessToken(_: string) {
		return { token: 'test-user-access-token' };
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

	async getUserAccessToken(_: string) {
		return { token: 'test-user-access-token' };
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
