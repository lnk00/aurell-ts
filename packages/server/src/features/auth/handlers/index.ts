import { Hono } from 'hono';
import { validator } from 'hono/validator';
import z from 'zod/v4';
import { getCookie, setCookie } from '../../../libs/cookie.lib';
import { getService } from '../../../libs/ioc.lib';
import { Validate } from '../../../libs/validator.lib';
import type { HonoContextType } from '../../../types/context.type';

const magicLinkSendSchema = z.object({
	email: z.email('email is required in the request body'),
});

const magicLinkVerifySchema = z.object({
	token: z.string('token is required in the request body'),
});

const orgCreateSchema = z.object({
	name: z.string('name is required in the request body'),
	token: z.string('token is required in the request body'),
});

const orgSigninSchema = z.object({
	id: z.string('id is required in the request body'),
	token: z.string('token is required in the request body'),
});

const authHandlers = new Hono<HonoContextType>()
	.post('/authenticate', async (c) => {
		let authenticated = false;
		const sessionService = getService('session');

		const jwt = getCookie(c, 'aurell_session_jwt');

		if (jwt) {
			const { sessionJwt } = await sessionService.verifyJwt(jwt);

			if (sessionJwt) {
				authenticated = true;
			}
		}

		return c.json({
			authenticated,
		});
	})
	.post(
		'/magiclink/send',
		validator('form', (value) => Validate(value, magicLinkSendSchema)),
		async (c) => {
			const magicLinkService = getService('magiclink');
			const { email } = c.req.valid('form');

			await magicLinkService.sendEmail(email);

			return c.json({
				success: true,
			});
		},
	)
	.post(
		'/magiclink/verify',
		validator('form', (value) => Validate(value, magicLinkVerifySchema)),
		async (c) => {
			const magicLinkService = getService('magiclink');
			const { token } = c.req.valid('form');

			const { token: intermediateToken, orgs } =
				await magicLinkService.verify(token);

			return c.json({
				intermediateToken,
				orgs,
			});
		},
	)
	.post(
		'/org/create',
		validator('form', (value) => Validate(value, orgCreateSchema)),
		async (c) => {
			const orgService = getService('org');
			const { name, token } = c.req.valid('form');

			const { sessionToken, sessionJwt } = await orgService.create(name, token);

			setCookie(c, 'aurell_session', sessionToken);
			setCookie(c, 'aurell_session_jwt', sessionJwt);

			return c.json({
				sessionToken,
				sessionJwt,
			});
		},
	)
	.post(
		'/org/signin',
		validator('form', (value) => Validate(value, orgSigninSchema)),
		async (c) => {
			const orgService = getService('org');
			const { id, token } = c.req.valid('form');

			const { sessionToken, sessionJwt } = await orgService.signin(id, token);

			setCookie(c, 'aurell_session', sessionToken);
			setCookie(c, 'aurell_session_jwt', sessionJwt);

			return c.json({
				sessionToken,
				sessionJwt,
			});
		},
	);
export default authHandlers;
