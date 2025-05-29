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
};

export function getServiceMockWith(services: ServiceTypeMap) {
	return <K extends keyof ServiceTypeMap>(serviceKey: K): ServiceTypeMap[K] => {
		if (serviceKey === 'session') {
			return services.session;
		}

		throw new Error('No service exist with the key: ', serviceKey);
	};
}
