import { vi } from 'vitest';
import type { Bindings } from './src/bindings';
import type { ServiceTypeMap } from './src/libs/ioc.lib';

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

export function getServiceMockWith(services: ServiceTypeMap) {
	const s = { ...defaultServiceMock, ...services };

	return <K extends keyof ServiceTypeMap>(serviceKey: K) => {
		if (serviceKey === 'session') {
			return s.session;
		}

		if (serviceKey === 'obcore') {
			return s.obcore;
		}

		throw new Error('No service exist with the key: ', serviceKey);
	};
}

export const defaultServiceMock: ServiceTypeMap = {
	session: {
		verifyJwt: (_: string) => Promise.resolve(),
	},
	obcore: {
		createDelegatedAuth: (_: string, __: string) => Promise.resolve(''),
	},
};
