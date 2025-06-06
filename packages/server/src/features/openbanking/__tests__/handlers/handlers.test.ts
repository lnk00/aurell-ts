import { Hono } from 'hono';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getServiceMockWith, MOCK_ENV } from '../../../../../test.config';
import { getService } from '../../../../libs/ioc.lib';
import type { HonoContextType } from '../../../../types/context.type';
import openbankingHandlers from '../../handlers';
import { ObCoreMockServiceCreateDelegatedAuthThrow } from '../mocks/ob-core.service.mock';

vi.mock('../../../../libs/ioc.lib', () => ({
	getService: vi.fn(),
	initializeServices: vi.fn(),
}));

describe('OB', () => {
	describe('HANDLERS', () => {
		let app: Hono<HonoContextType>;

		beforeEach(() => {
			app = new Hono<HonoContextType>();
			app.route('/api/ob', openbankingHandlers);
			vi.clearAllMocks();
		});

		describe('when /api/ob/link/code as called', () => {
			it('it should return with a status 200 and a code', async () => {
				vi.mocked(getService).mockImplementation(getServiceMockWith({}));

				const res = await app.request(
					'http://localhost/api/ob/link/code',
					{},
					MOCK_ENV,
				);

				expect(res.status).toBe(200);
				expect(await res.json()).toEqual({ code: 'test-link-code' });
			});
		});

		describe('when /api/ob/link/code and the ob provider failed to generated a code', () => {
			it('it should return with a status 400', async () => {
				vi.mocked(getService).mockImplementation(
					getServiceMockWith({
						obcore: new ObCoreMockServiceCreateDelegatedAuthThrow(),
					}),
				);

				const res = await app.request(
					'http://localhost/api/ob/link/code',
					{},
					MOCK_ENV,
				);

				expect(res.status).toBe(400);
			});
		});
	});
});
