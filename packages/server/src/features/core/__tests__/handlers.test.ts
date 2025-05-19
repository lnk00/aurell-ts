import { describe, it, expect, beforeAll } from 'vitest';
import coreHandlers from '../handlers';
import { Hono } from 'hono';

describe('CORE', () => {
	describe('HANDLERS', () => {
		describe('/api/core/infos', () => {
			let app: Hono;

			beforeAll(() => {
				app = new Hono().route('/api/core', coreHandlers);
			});

			it('Should return 200 response', async () => {
				const res = await app.request('http://localhost/api/core/infos');
				expect(res.status).toBe(200);
			});

			it('Should return a valid json response', async () => {
				const res = await app.request('http://localhost/api/core/infos');
				expect(await res.json()).toEqual({
					name: 'fiqo-api',
					version: '0.0.1',
				});
			});
		});
	});
});
