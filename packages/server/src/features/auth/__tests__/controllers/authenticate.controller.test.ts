import type { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	getConfiguredApp,
	getServiceMockWith,
} from '../../../../../test.config';
import { getCookie } from '../../../../libs/cookie.lib';
import { getService } from '../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../types/context.type';
import { authtenticateController } from '../../controllers/authenticate.controller';

describe('AUTH', () => {
	describe('CONTROLLERS', () => {
		describe('AUTHENTICATE', () => {
			let app: Hono<HonoContextType>;

			beforeEach(() => {
				app = getConfiguredApp().post('/test', ...authtenticateController);
				vi.clearAllMocks();
			});

			describe('when authenticate controller is called and a valid session token jwt is provided', () => {
				it('it should return a valid response with a 200 status code', async () => {
					vi.mocked(getCookie).mockReturnValue('valid-jwt-token');
					vi.mocked(getService).mockImplementation(getServiceMockWith({}));

					const spyVerifyJwt = vi.spyOn(getService('session'), 'verifyJwt');

					const res = await app.request('http://localhost/test', {
						method: 'POST',
					});

					expect(res.status).toBe(200);
					expect(spyVerifyJwt).toHaveBeenCalledWith('valid-jwt-token');
					expect(await res.json()).toEqual({ authenticated: true });
				});
			});

			describe('when authenticate controller is called and no session token jwt is provided', () => {
				it('it should return a response with authenticated to false with a 200 status code', async () => {
					vi.mocked(getCookie).mockReturnValue(undefined);
					vi.mocked(getService).mockImplementation(getServiceMockWith({}));

					const spyVerifyJwt = vi.spyOn(getService('session'), 'verifyJwt');

					const res = await app.request('http://localhost/test', {
						method: 'POST',
					});

					expect(res.status).toBe(200);
					expect(spyVerifyJwt).not.toHaveBeenCalled();
					expect(await res.json()).toEqual({ authenticated: false });
				});
			});
		});
	});
});
