import { describe, it, expect } from 'vitest';
import app from '../src';

describe('/api', () => {
	it('Should return 200 response', async () => {
		const res = await app.request('http://localhost/api');
		expect(res.status).toBe(200);
	});

	it('Should return a valid json response', async () => {
		const res = await app.request('http://localhost/api');
		expect(await res.json()).toEqual({
			name: 'fiqo-api',
			version: '0.0.1',
		});
	});
});
