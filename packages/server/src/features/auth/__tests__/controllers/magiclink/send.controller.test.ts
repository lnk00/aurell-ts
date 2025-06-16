import type { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	getConfiguredApp,
	getServiceMockWith,
} from '../../../../../../test.config';
import { getService } from '../../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../../types/context.type';
import { magiclinkSendController } from '../../../controllers/magiclink/send.controller';

describe('AUTH', () => {
	describe('CONTROLLERS', () => {
		describe('MAGICLINK - SEND', () => {
			let app: Hono<HonoContextType>;

			beforeEach(() => {
				app = getConfiguredApp().post('/test', ...magiclinkSendController);
				vi.clearAllMocks();
			});

			describe('when magiclink send controller is called with a valid email in the request body', () => {
				it('it should return a valid response with a 200 status code', async () => {
					const formData = new FormData();
					formData.append('email', 'test@test.com');

					vi.mocked(getService).mockImplementation(getServiceMockWith({}));
					const spySendEmail = vi.spyOn(getService('magiclink'), 'sendEmail');

					const res = await app.request('http://localhost/test', {
						method: 'POST',
						body: formData,
					});

					expect(res.status).toBe(200);
					expect(spySendEmail).toHaveBeenCalledWith('test@test.com');
					expect(await res.json()).toEqual({ success: true });
				});
			});

			describe('when magiclink send controller is called without a valid email in the request body', () => {
				it('it should return an error response with a 400 status code', async () => {
					const formData = new FormData();
					formData.append('email', 'test-invalid-email');

					vi.mocked(getService).mockImplementation(getServiceMockWith({}));
					const spySendEmail = vi.spyOn(getService('magiclink'), 'sendEmail');

					const res = await app.request('http://localhost/test', {
						method: 'POST',
						body: formData,
					});

					expect(res.status).toBe(400);
					expect(spySendEmail).not.toHaveBeenCalledWith();
					expect(await res.json()).toMatchObject({
						error: {
							code: 'TypeValidationError',
							message: 'a valid email is required in the request body',
						},
					});
				});
			});
		});
	});
});
