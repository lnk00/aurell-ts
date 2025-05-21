import { Hono } from 'hono';
import * as stytch from 'stytch';
import type { Bindings } from '../../../bindings';

const coreHandlers = new Hono<{ Bindings: Bindings }>().get(
	'/infos',
	async (c) => {
		const headers = c.req.header();

		try {
			const stytchClient = new stytch.Client({
				project_id: c.env.STYTCH_PROJECT_ID,
				secret: c.env.STYTCH_SECRET,
			});
			const res = await stytchClient.sessions.authenticateJwt({
				session_jwt: headers.authorization.replace('Bearer ', ''),
			});

			console.log(res);
		} catch (e) {
			console.log(e);
		}

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
