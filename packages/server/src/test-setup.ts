import { vi } from 'vitest';

// Mock cookie.lib
vi.mock('./libs/cookie.lib', () => ({
	getCookie: vi.fn(),
	setCookie: vi.fn(),
	deleteCookie: vi.fn(),
}));

// Mock ioc.lib
vi.mock('./libs/ioc.lib', () => ({
	getService: vi.fn(),
	initializeServices: vi.fn(),
}));
