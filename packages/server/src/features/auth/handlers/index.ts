import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import { validator } from 'hono/validator';
import z from 'zod/v4';
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

			const cookieOptions: Parameters<typeof setCookie>[3] = {
				sameSite: 'Lax',
			};
			if (!c.env.CLIENT_URL.includes('localhost')) {
				cookieOptions.domain = '.aurell.app';
				cookieOptions.secure = true;
			}

			setCookie(c, 'aurell_session', sessionToken, cookieOptions);
			setCookie(c, 'aurell_session_jwt', sessionJwt, cookieOptions);

			return c.json({
				sessionToken,
				sessionJwt,
			});
		},
	);
export default authHandlers;
