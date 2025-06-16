import type { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	getConfiguredApp,
	getServiceMockWith,
} from '../../../../../../test.config';
import { setCookie } from '../../../../../libs/cookie.lib';
import { getService } from '../../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../../types/context.type';
import { orgSigninController } from '../../../controllers/org/signin.controller';

describe('AUTH', () => {
	describe('CONTROLLERS', () => {
		describe('ORG', () => {
			describe('SIGNIN', () => {
				let app: Hono<HonoContextType>;

				beforeEach(() => {
					app = getConfiguredApp().post('/test', ...orgSigninController);
					vi.clearAllMocks();
				});

				describe('when org signin controller is called with a valid id and token in the request body', () => {
					it('it should return a valid response with a 200 status code', async () => {
						const formData = new FormData();
						formData.append('id', 'test-id');
						formData.append('token', 'test-token');

						vi.mocked(getService).mockImplementation(getServiceMockWith({}));
						const spySignin = vi.spyOn(getService('org'), 'signin');

						const res = await app.request('http://localhost/test', {
							method: 'POST',
							body: formData,
						});

						expect(res.status).toBe(200);
						expect(spySignin).toHaveBeenCalledWith('test-id', 'test-token');
						expect(setCookie).toHaveBeenCalledTimes(2);
						expect(await res.json()).toEqual({
							sessionToken: 'test-session-token',
							sessionJwt: 'test-session-jwt',
						});
					});
				});

				describe('when org signin controller is called without a valid id in the request body', () => {
					it('it should return an error response with a 400 status code', async () => {
						const formData = new FormData();
						formData.append('token', 'test-token');

						vi.mocked(getService).mockImplementation(getServiceMockWith({}));
						const spySignin = vi.spyOn(getService('org'), 'signin');

						const res = await app.request('http://localhost/test', {
							method: 'POST',
							body: formData,
						});

						expect(res.status).toBe(400);
						expect(spySignin).not.toHaveBeenCalledWith();
						expect(setCookie).not.toHaveBeenCalled();
						expect(await res.json()).toMatchObject({
							error: {
								code: 'TypeValidationError',
								message: 'an id is required in the request body',
							},
						});
					});
				});

				describe('when org signin controller is called without a valid name in the request body', () => {
					it('it should return an error response with a 400 status code', async () => {
						const formData = new FormData();
						formData.append('id', 'test-id');

						vi.mocked(getService).mockImplementation(getServiceMockWith({}));
						const spySignin = vi.spyOn(getService('org'), 'signin');

						const res = await app.request('http://localhost/test', {
							method: 'POST',
							body: formData,
						});

						expect(res.status).toBe(400);
						expect(spySignin).not.toHaveBeenCalledWith();
						expect(setCookie).not.toHaveBeenCalled();
						expect(await res.json()).toMatchObject({
							error: {
								code: 'TypeValidationError',
								message: 'a token is required in the request body',
							},
						});
					});
				});
			});
		});
	});
});
