import type { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	getConfiguredApp,
	getServiceMockWith,
} from '../../../../../../test.config';
import { setCookie } from '../../../../../libs/cookie.lib';
import { getService } from '../../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../../types/context.type';
import { orgCreateController } from '../../../controllers/org/create.controller';

describe('AUTH', () => {
	describe('CONTROLLERS', () => {
		describe('ORG', () => {
			describe('CREATE', () => {
				let app: Hono<HonoContextType>;

				beforeEach(() => {
					app = getConfiguredApp().post('/test', ...orgCreateController);
					vi.clearAllMocks();
				});

				describe('when org create controller is called with a valid name and token in the request body', () => {
					it('it should return a valid response with a 200 status code', async () => {
						const formData = new FormData();
						formData.append('name', 'test-name');
						formData.append('token', 'test-token');

						vi.mocked(getService).mockImplementation(getServiceMockWith({}));
						const spyCreate = vi.spyOn(getService('org'), 'create');

						const res = await app.request('http://localhost/test', {
							method: 'POST',
							body: formData,
						});

						expect(res.status).toBe(200);
						expect(spyCreate).toHaveBeenCalledWith('test-name', 'test-token');
						expect(setCookie).toHaveBeenCalledTimes(2);
						expect(await res.json()).toEqual({
							sessionToken: 'test-session-token',
							sessionJwt: 'test-session-jwt',
						});
					});
				});

				describe('when org create controller is called without a valid name in the request body', () => {
					it('it should return an error response with a 400 status code', async () => {
						const formData = new FormData();
						formData.append('token', 'test-token');

						vi.mocked(getService).mockImplementation(getServiceMockWith({}));
						const spyCreate = vi.spyOn(getService('org'), 'create');

						const res = await app.request('http://localhost/test', {
							method: 'POST',
							body: formData,
						});

						expect(res.status).toBe(400);
						expect(spyCreate).not.toHaveBeenCalledWith();
						expect(setCookie).not.toHaveBeenCalled();
						expect(await res.json()).toMatchObject({
							error: {
								code: 'TypeValidationError',
								message: 'a name is required in the request body',
							},
						});
					});
				});
				describe('when org create controller is called without a valid token in the request body', () => {
					it('it should return an error response with a 400 status code', async () => {
						const formData = new FormData();
						formData.append('name', 'test-name');

						vi.mocked(getService).mockImplementation(getServiceMockWith({}));
						const spyCreate = vi.spyOn(getService('org'), 'create');

						const res = await app.request('http://localhost/test', {
							method: 'POST',
							body: formData,
						});

						expect(res.status).toBe(400);
						expect(spyCreate).not.toHaveBeenCalledWith();
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
