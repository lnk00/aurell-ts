import { describe, it, expect, beforeAll, vi } from 'vitest';
import coreHandlers from '../handlers';
import { Hono } from 'hono';
import { MOCK_ENV } from '../../../../test.config';

describe('PROFILE', () => {
	describe('HANDLERS', () => {
		let app: Hono;

		beforeAll(() => {
			app = new Hono().route('/api/profile', coreHandlers);
		});

		describe('when /api/profile/create is called', () => {
			it('it should return with a status 200', async () => {
				const formData = new FormData();
				formData.append('userId', 'test-user-id');

				const prepareSpy = vi.spyOn(MOCK_ENV.DB, 'prepare');

				const res = await app.request(
					'http://localhost/api/profile/create',
					{
						method: 'POST',
						body: formData,
					},
					MOCK_ENV,
				);

				expect(res.status).toBe(200);
				expect(prepareSpy).toHaveBeenCalled();
			});
		});

		describe('when /api/profile/create is called without userId in form data', () => {
			it('it should return with a status 400', async () => {
				const formData = new FormData();

				const prepareSpy = vi.spyOn(MOCK_ENV.DB, 'prepare');

				const res = await app.request(
					'http://localhost/api/profile/create',
					{
						method: 'POST',
						body: formData,
					},
					MOCK_ENV,
				);

				expect(res.status).toBe(400);
				expect(prepareSpy).not.toHaveBeenCalled();
			});
		});
	});
});
