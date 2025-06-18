import type { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
	getConfiguredApp,
	getServiceMockWith,
} from '../../../../../test.config';
import { getService } from '../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../types/context.type';
import { OpenbankingError } from '../../../../types/errors.type';
import { accountsController } from '../../controllers/accounts';

describe('BANKACCOUNT', () => {
	describe('CONTROLLERS', () => {
		describe('ACCOUNTS', () => {
			let app: Hono<HonoContextType>;

			beforeEach(() => {
				app = getConfiguredApp().get('/test', ...accountsController);
				vi.clearAllMocks();
			});

			describe('when accounts controller is called with a valid userId', () => {
				it('it should return a valid response with accounts and a 200 status code', async () => {
					const mockAccounts = [
						{
							id: 'account-1',
							name: 'Test Account 1',
							type: 'CHECKING',
							balance: 1000.5,
							currency: 'USD',
						},
						{
							id: 'account-2',
							name: 'Test Account 2',
							type: 'SAVINGS',
							balance: 2500.75,
							currency: 'USD',
						},
					];

					vi.mocked(getService).mockImplementation(
						getServiceMockWith({
							obaccount: {
								listAccounts: vi.fn().mockResolvedValue(mockAccounts),
							},
						}),
					);

					// Mock the context to include userId
					const res = await app.request('http://localhost/test', {
						method: 'GET',
					});

					expect(res.status).toBe(200);
					expect(await res.json()).toEqual({
						accounts: mockAccounts,
					});
				});
			});

			describe('when accounts controller is called and obAccountService returns empty array', () => {
				it('it should return an empty accounts array with a 200 status code', async () => {
					vi.mocked(getService).mockImplementation(
						getServiceMockWith({
							obaccount: {
								listAccounts: vi.fn().mockResolvedValue([]),
							},
						}),
					);

					const res = await app.request('http://localhost/test', {
						method: 'GET',
					});

					expect(res.status).toBe(200);
					expect(await res.json()).toEqual({
						accounts: [],
					});
				});
			});

			describe('when accounts controller is called and obAccountService throws an error', () => {
				it('it should return an error response with a 400 status code', async () => {
					const mockError = new OpenbankingError(
						'Could not get user access token from authorization code',
					);

					vi.mocked(getService).mockImplementation(
						getServiceMockWith({
							obaccount: {
								listAccounts: vi.fn().mockRejectedValue(mockError),
							},
						}),
					);

					const res = await app.request('http://localhost/test', {
						method: 'GET',
					});

					expect(res.status).toBe(400);
					expect(await res.json()).toMatchObject({
						error: {
							code: 'OpenBankingError',
							message:
								'Could not get user access token from authorization code',
						},
					});
				});
			});
		});
	});
});
