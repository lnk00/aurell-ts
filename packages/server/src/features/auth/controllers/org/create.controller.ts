import { validator } from 'hono/validator';
import z from 'zod/v4';
import { setCookie } from '../../../../libs/cookie.lib';
import { factory } from '../../../../libs/factory.lib';
import { getService } from '../../../../libs/ioc.lib';
import { Validate } from '../../../../libs/validator.lib';

const orgCreateSchema = z.object({
	name: z.string('name is required in the request body'),
	token: z.string('token is required in the request body'),
});

export const orgCreateController = factory.createHandlers(
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
);
