import { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getServiceMockWith } from '../../../../../../test.config';
import { deleteCookie, getCookie } from '../../../../../libs/cookie.lib';
import { getService } from '../../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../../types/context.type';
import { signoutController } from '../../../controllers/signout.controller';

describe('AUTH', () => {
	describe('CONTROLLERS', () => {
		describe('SIGNOUT', () => {
			let app: Hono<HonoContextType>;

			beforeEach(() => {
				app = new Hono<HonoContextType>().post('/test', ...signoutController);

				vi.clearAllMocks();
			});

			describe('when signout controller is called and a session token jwt is provided', () => {
				it('it should return a valid response with a 200 status code', async () => {
					vi.mocked(getService).mockImplementation(getServiceMockWith({}));
					vi.mocked(getCookie).mockReturnValue('valid-jwt-token');

					const spySignout = vi.spyOn(getService('session'), 'signout');

					const res = await app.request('http://localhost/test', {
						method: 'POST',
					});

					expect(res.status).toBe(200);
					expect(spySignout).toHaveBeenCalledWith('valid-jwt-token');
					expect(deleteCookie).toHaveBeenCalledTimes(2);
					expect(await res.json()).toEqual({ success: true });
				});
			});
		});
	});
});
