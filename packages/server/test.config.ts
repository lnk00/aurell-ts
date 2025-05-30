import { vi } from 'vitest';
import type { ServiceTypeMap } from './src/libs/ioc.lib';
import type { Bindings } from './src/types/context.type';
import { SessionMockService } from './src/features/auth/__tests__/mocks/session.service.mock';
import { ObCoreMockService } from './src/features/openbanking/__tests__/mocks/ob-core.service.mock';

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
	session: new SessionMockService(),
	obcore: new ObCoreMockService(),
};
