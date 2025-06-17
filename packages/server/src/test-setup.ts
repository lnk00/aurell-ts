import { vi } from 'vitest';

vi.mock('./libs/cookie.lib', () => ({
	getCookie: vi.fn(),
	setCookie: vi.fn(),
	deleteCookie: vi.fn(),
}));

vi.mock('./libs/ioc.lib', () => ({
	getService: vi.fn(),
	initializeServices: vi.fn(),
}));

vi.mock('stytch', () => ({
	B2BClient: vi.fn(),
}));
