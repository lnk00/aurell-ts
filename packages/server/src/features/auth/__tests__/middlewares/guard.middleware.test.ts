import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Hono } from 'hono';
import { guardMiddleware } from '../../middlewares/guard.middleware';
import type { Bindings } from '../../../../bindings';
import { MOCK_ENV } from '../../../../../test.config';
import { serviceMiddleware } from '../../../core/middlewares/service.middleware';
import { getService } from '../../../../libs/ioc.lib';
import { getCookie } from 'hono/cookie';

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
					const mockSessionService = {
						verifyJwt: vi.fn().mockRejectedValue(new Error('Invalid JWT')),
					};

					vi.mocked(getCookie).mockReturnValue('invalid-jwt-token');
					vi.mocked(getService).mockReturnValue(mockSessionService);

					const res = await app.request(
						'http://localhost/protected',
						{},
						MOCK_ENV,
					);

					expect(res.status).toBe(401);
					expect(mockSessionService.verifyJwt).toHaveBeenCalledWith(
						'invalid-jwt-token',
					);
				});
			});

			describe('when JWT cookie is valid', () => {
				it('it should proceed to next middleware/handler', async () => {
					const mockSessionService = {
						verifyJwt: vi.fn(),
					};

					vi.mocked(getCookie).mockReturnValue('valid-jwt-token');
					vi.mocked(getService).mockReturnValue(mockSessionService);

					const res = await app.request(
						'http://localhost/protected',
						{},
						MOCK_ENV,
					);

					expect(res.status).toBe(200);
					expect(await res.json()).toEqual({ success: true });
					expect(mockSessionService.verifyJwt).toHaveBeenCalledWith(
						'valid-jwt-token',
					);
				});
			});
		});
	});
});
