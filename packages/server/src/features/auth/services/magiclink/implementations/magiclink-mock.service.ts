import { injectable } from 'inversify';
import type { MagicLinkService } from '../magiclink.service';

@injectable()
export class MagicLinkMockService implements MagicLinkService {
	async sendEmail(_: string) {
		return Promise.resolve();
	}

	async verify(_: string) {
		return {
			token: 'test-token',
			orgs: [
				{
					id: 'test-org-id-1',
					name: 'test-org-1',
					logo: 'https://example.com/logo.png',
				},
				{
					id: 'test-org-id-2',
					name: 'test-org-2',
					logo: 'https://example.com/logo.png',
				},
				{
					id: 'test-org-id-3',
					name: 'test-org-3',
					logo: 'https://example.com/logo.png',
				},
			],
		};
	}
}
