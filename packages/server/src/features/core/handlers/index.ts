import { Hono } from 'hono';
import * as stytch from 'stytch';
import type { Bindings } from '../../../bindings';

const coreHandlers = new Hono<{ Bindings: Bindings }>().get(
	'/infos',
	async (c) => {
		return c.json(
			{
				name: 'fiqo-api',
				version: '0.0.1',
			},
			200,
		);
	},
);

export default coreHandlers;
