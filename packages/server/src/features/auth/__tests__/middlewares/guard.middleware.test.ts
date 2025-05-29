import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Hono } from 'hono';
import { guardMiddleware } from '../../middlewares/guard.middleware';
import type { Bindings } from '../../../../bindings';
import { MOCK_ENV } from '../../../../../test.config';
import { serviceMiddleware } from '../../../core/middlewares/service.middleware';

vi.mock('stytch', () => ({
	Client: vi.fn(),
}));

vi.mock('hono/cookie', () => ({
	getCookie: vi.fn(),
}));

describe('AUTH', () => {
	describe('MIDDLEWARES', () => {
		describe('GUARD MIDDLEWARE', () => {
			let app: Hono<{ Bindings: Bindings }>;

			beforeEach(() => {
				app = new Hono<{ Bindings: Bindings }>();
				app.use('*', serviceMiddleware);
				app.use('*', guardMiddleware);
				app.get('/protected', (c) => c.json({ success: true }));
				vi.clearAllMocks();
			});

			describe('when JWT cookie is missing', () => {
				it('it should throw NotAuthenticatedError', async () => {
					const { getCookie } = await import('hono/cookie');
					vi.mocked(getCookie).mockReturnValue(undefined);

					const res = await app.request(
						'http://localhost/protected',
						{},
						MOCK_ENV,
					);

					expect(res.status).toBe(401);
				});
			});

			describe('when JWT cookie is present but invalid', () => {
				it('it should throw NotAuthenticatedError', async () => {
					const { getCookie } = await import('hono/cookie');
					vi.mocked(getCookie).mockReturnValue('invalid-jwt-token');

					const mockStytchClient = {
						sessions: {
							authenticateJwt: vi
								.fn()
								.mockRejectedValue(new Error('Invalid JWT')),
						},
					};

					const { Client } = await import('stytch');
					// biome-ignore lint/suspicious/noExplicitAny: Complex mock type
					vi.mocked(Client).mockReturnValue(mockStytchClient as any);

					const res = await app.request(
						'http://localhost/protected',
						{},
						MOCK_ENV,
					);

					expect(res.status).toBe(401);
					expect(
						mockStytchClient.sessions.authenticateJwt,
					).toHaveBeenCalledWith({
						session_jwt: 'invalid-jwt-token',
					});
				});
			});

			describe('when JWT cookie is valid', () => {
				it('it should proceed to next middleware/handler', async () => {
					const { getCookie } = await import('hono/cookie');
					vi.mocked(getCookie).mockReturnValue('valid-jwt-token');

					const mockStytchClient = {
						sessions: {
							authenticateJwt: vi.fn().mockResolvedValue({
								session: { user_id: 'test-user-id' },
							}),
						},
					};
					const { Client } = await import('stytch');
					// biome-ignore lint/suspicious/noExplicitAny: Complex mock type
					vi.mocked(Client).mockReturnValue(mockStytchClient as any);

					const res = await app.request(
						'http://localhost/protected',
						{},
						MOCK_ENV,
					);

					expect(res.status).toBe(200);
					expect(await res.json()).toEqual({ success: true });
					expect(
						mockStytchClient.sessions.authenticateJwt,
					).toHaveBeenCalledWith({
						session_jwt: 'valid-jwt-token',
					});
				});
			});

			describe('when Stytch client is initialized', () => {
				it('it should be initialized with correct credentials', async () => {
					const { getCookie } = await import('hono/cookie');
					vi.mocked(getCookie).mockReturnValue('valid-jwt-token');

					const mockStytchClient = {
						sessions: {
							authenticateJwt: vi.fn().mockResolvedValue({}),
						},
					};
					const { Client } = await import('stytch');
					// biome-ignore lint/suspicious/noExplicitAny: Complex mock type
					vi.mocked(Client).mockReturnValue(mockStytchClient as any);

					await app.request('http://localhost/protected', {}, MOCK_ENV);

					expect(Client).toHaveBeenCalledWith({
						project_id: 'test-stytch-project-id',
						secret: 'test-stytch-secret',
					});
				});
			});
		});
	});
});
