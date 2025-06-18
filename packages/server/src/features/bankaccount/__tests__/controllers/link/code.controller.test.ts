import type { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	getConfiguredApp,
	getServiceMockWith,
} from '../../../../../../test.config';
import { getService } from '../../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../../types/context.type';
import { linkCodeController } from '../../../controllers/link/code.controller';
import { ObCoreMockServiceCreateDelegatedAuthThrow } from '../../../services/ob-core/implementations/ob-core-mock.service';

describe('BANKACCOUNT', () => {
	describe('CONTROLLERS', () => {
		describe('LINK', () => {
			describe('CODE', () => {
				let app: Hono<HonoContextType>;

				beforeEach(() => {
					app = getConfiguredApp().get('/test', ...linkCodeController);
					vi.clearAllMocks();
				});

				describe('when link code controller is called with a valid userId', () => {
					it('it should return a valid response with link code and a 200 status code', async () => {
						vi.mocked(getService).mockImplementation(getServiceMockWith({}));

						const res = await app.request('http://localhost/test', {
							method: 'GET',
						});

						expect(res.status).toBe(200);
						expect(await res.json()).toEqual({
							code: 'test-link-code',
						});
					});
				});

				describe('when link code controller is called and obCoreService throws an error', () => {
					it('it should return an error response with a 400 status code', async () => {
						vi.mocked(getService).mockImplementation(
							getServiceMockWith({
								obcore: new ObCoreMockServiceCreateDelegatedAuthThrow(),
							}),
						);

						const res = await app.request('http://localhost/test', {
							method: 'GET',
						});

						expect(res.status).toBe(400);
						expect(await res.json()).toMatchObject({
							error: {
								code: 'OpenBankingError',
								message: 'Could not delegate the tink auth to connected user',
							},
						});
					});
				});
			});
		});
	});
});
