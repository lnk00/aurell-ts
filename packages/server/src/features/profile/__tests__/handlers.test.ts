import { describe, it, expect, beforeAll, vi } from 'vitest';
import coreHandlers from '../handlers';
import { Hono } from 'hono';

describe('CORE', () => {
	describe('HANDLERS', () => {
		describe('/api/profile/create', () => {
			let app: Hono;
			const MOCK_ENV = {
				DB: {
					prepare: () => {
						return {
							bind: () => {
								return {
									run: () => {},
								};
							},
						};
					},
				},
			};

			beforeAll(() => {
				app = new Hono().route('/api/profile', coreHandlers);
			});

			it('Should return 200 response', async () => {
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
	});
});
