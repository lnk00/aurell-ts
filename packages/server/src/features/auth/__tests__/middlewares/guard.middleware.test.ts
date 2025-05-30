import { type Context, Hono } from 'hono';
import { getCookie } from 'hono/cookie';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getServiceMockWith, MOCK_ENV } from '../../../../../test.config';
import { getService } from '../../../../libs/ioc.lib';
import { guardMiddleware } from '../../middlewares/guard.middleware';
import type { HonoContextType } from '../../../../types/context.type';
import { SessionMockServiceVerifyJwtThrow } from '../mocks/session.service.mock';

vi.mock('hono/cookie', () => ({
	getCookie: vi.fn(),
}));

vi.mock('../../../../libs/ioc.lib', () => ({
	getService: vi.fn(),
	initializeServices: vi.fn(),
}));

describe('AUTH', () => {
	describe('MIDDLEWARES', () => {
		describe('GUARD MIDDLEWARE', () => {
			let app: Hono<HonoContextType>;
			let testContext: Context<HonoContextType>;

			beforeEach(() => {
				app = new Hono<HonoContextType>();
				app.use('*', async (c, next) => {
					c.set('userId', null);
					c.set('sessionId', null);
					testContext = c;
					await next();
				});
				app.use('*', guardMiddleware);
				app.get('/protected', (c) => c.json({ success: true }));
				vi.clearAllMocks();
			});

			describe('when JWT cookie is missing', () => {
				it('it should throw NotAuthenticatedError', async () => {
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
					vi.mocked(getCookie).mockReturnValue('invalid-jwt-token');
					vi.mocked(getService).mockImplementation(
						getServiceMockWith({
							session: new SessionMockServiceVerifyJwtThrow(),
						}),
					);

					const spyVerifyJwt = vi.spyOn(getService('session'), 'verifyJwt');

					const res = await app.request(
						'http://localhost/protected',
						{},
						MOCK_ENV,
					);

					expect(res.status).toBe(401);
					expect(spyVerifyJwt).toHaveBeenCalledWith('invalid-jwt-token');
				});
			});

			describe('when JWT cookie is valid', () => {
				it('it should proceed to next middleware/handler', async () => {
					vi.mocked(getCookie).mockReturnValue('valid-jwt-token');
					vi.mocked(getService).mockImplementation(getServiceMockWith({}));

					const spyVerifyJwt = vi.spyOn(getService('session'), 'verifyJwt');

					const res = await app.request(
						'http://localhost/protected',
						{},
						MOCK_ENV,
					);

					expect(res.status).toBe(200);
					expect(await res.json()).toEqual({ success: true });
					expect(spyVerifyJwt).toHaveBeenCalledWith('valid-jwt-token');
					expect(testContext.get('userId')).toBe('test-user-id');
					expect(testContext.get('sessionId')).toBe('test-session-id');
				});
			});
		});
	});
});
