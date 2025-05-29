import { vi } from 'vitest';
import type { Bindings } from './src/bindings';

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
