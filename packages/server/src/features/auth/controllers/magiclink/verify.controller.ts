import { validator } from 'hono/validator';
import z from 'zod/v4';
import { factory } from '../../../../libs/factory.lib';
import { getService } from '../../../../libs/ioc.lib';
import { Validate } from '../../../../libs/validator.lib';

const magicLinkVerifySchema = z.object({
	token: z.string('a token is required in the request body'),
});

export const magiclinkVerifyController = factory.createHandlers(
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
);
