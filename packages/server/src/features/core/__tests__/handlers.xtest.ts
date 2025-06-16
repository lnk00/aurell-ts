import { describe, it, expect, beforeAll } from 'vitest';
import coreHandlers from '../handlers';
import { Hono } from 'hono';

describe('CORE', () => {
	describe('HANDLERS', () => {
		let app: Hono;

		beforeAll(() => {
			app = new Hono().route('/api/core', coreHandlers);
		});

		describe('when /api/core/infos is called', () => {
			it('it should return with a status 200', async () => {
				const res = await app.request('http://localhost/api/core/infos');
				expect(res.status).toBe(200);
			});

			it('it should return a valid json response', async () => {
				const res = await app.request('http://localhost/api/core/infos');
				expect(await res.json()).toEqual({
					name: 'aurell-api',
					version: '0.0.1',
				});
			});
		});
	});
});
