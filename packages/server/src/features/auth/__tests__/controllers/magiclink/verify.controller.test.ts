import type { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	getConfiguredApp,
	getServiceMockWith,
} from '../../../../../../test.config';
import { getService } from '../../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../../types/context.type';
import { magiclinkVerifyController } from '../../../controllers/magiclink/verify.controller';

describe('AUTH', () => {
	describe('CONTROLLERS', () => {
		describe('MAGICLINK', () => {
			describe('VERIFY', () => {
				let app: Hono<HonoContextType>;

				beforeEach(() => {
					app = getConfiguredApp().post('/test', ...magiclinkVerifyController);
					vi.clearAllMocks();
				});

				describe('when magiclink verify controller is called with a valid token in the request body', () => {
					it('it should return a valid response with a 200 status code', async () => {
						const formData = new FormData();
						formData.append('token', 'test-valid-token');

						vi.mocked(getService).mockImplementation(getServiceMockWith({}));
						const spyVerify = vi.spyOn(getService('magiclink'), 'verify');

						const res = await app.request('http://localhost/test', {
							method: 'POST',
							body: formData,
						});

						expect(res.status).toBe(200);
						expect(spyVerify).toHaveBeenCalledWith('test-valid-token');
						expect(await res.json()).toMatchObject({
							intermediateToken: 'test-token',
							orgs: [
								{
									id: 'test-org-id-1',
									name: 'test-org-1',
									logo: 'https://example.com/logo.png',
								},
								{
									id: 'test-org-id-2',
									name: 'test-org-2',
									logo: 'https://example.com/logo.png',
								},
								{
									id: 'test-org-id-3',
									name: 'test-org-3',
									logo: 'https://example.com/logo.png',
								},
							],
						});
					});
				});

				describe('when magiclink verify controller is called without a valid token in the request body', () => {
					it('it should return an error response with a 400 status code', async () => {
						const formData = new FormData();

						vi.mocked(getService).mockImplementation(getServiceMockWith({}));
						const spyVerify = vi.spyOn(getService('magiclink'), 'verify');

						const res = await app.request('http://localhost/test', {
							method: 'POST',
							body: formData,
						});

						expect(res.status).toBe(400);
						expect(spyVerify).not.toHaveBeenCalledWith();
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
