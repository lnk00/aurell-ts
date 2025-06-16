import { vi } from 'vitest';
import { MagicLinkMockService } from './src/features/auth/services/magiclink/implementations/magiclink-mock.service';
import { OrgMockService } from './src/features/auth/services/org/implementations/org-mock.service';
import { SessionMockService } from './src/features/auth/services/session/implementations/session-mock.service';
import { ObAccountMockService } from './src/features/bankaccount/services/ob-account/implementations/ob-account-mock.service';
import { ObCoreMockService } from './src/features/bankaccount/services/ob-core/implementations/ob-core-mock.service';
import type { ServiceTypeMap } from './src/libs/ioc.lib';
import type { Bindings } from './src/types/context.type';

export const MOCK_ENV: Bindings = {
	DB: {
		prepare: vi.fn().mockReturnValue({
			bind: vi.fn().mockReturnValue({
				run: vi.fn(),
			}),
		}),
	} as unknown as D1Database,
	STYTCH_PROJECT_ID: 'test-stytch-project-id',
	STYTCH_SECRET: 'test-stytch-secret',
	CLIENT_URL: 'http://localhost:5173',
	TINK_CLIENT_ID: 'test-tink-client-id',
	TINK_CLIENT_SECRET: 'test-tink-client-secret',
};

export function getServiceMockWith(services: Partial<ServiceTypeMap>) {
	const s = { ...defaultServiceMock, ...services };

	return <K extends keyof ServiceTypeMap>(serviceKey: K) => {
		switch (serviceKey) {
			case 'session':
				return s.session;
			case 'magiclink':
				return s.magiclink;
			case 'org':
				return s.org;
			case 'obcore':
				return s.obcore;
			case 'obaccount':
				return s.obaccount;
			default:
				throw new Error(`No service exist with the key: ${serviceKey}`);
		}
	};
}

export const defaultServiceMock: ServiceTypeMap = {
	session: new SessionMockService(),
	magiclink: new MagicLinkMockService(),
	org: new OrgMockService(),
	obcore: new ObCoreMockService(),
	obaccount: new ObAccountMockService(),
};
