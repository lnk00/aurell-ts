import { validator } from 'hono/validator';
import z from 'zod/v4';
import { factory } from '../../../../libs/factory.lib';
import { getService } from '../../../../libs/ioc.lib';
import { Validate } from '../../../../libs/validator.lib';

const magicLinkSendSchema = z.object({
	email: z.email('email is required in the request body'),
});

export const magiclinkSendController = factory.createHandlers(
	validator('form', (value) => Validate(value, magicLinkSendSchema)),
	async (c) => {
		const magicLinkService = getService('magiclink');
		const { email } = c.req.valid('form');

		await magicLinkService.sendEmail(email);

		return c.json({
			success: true,
		});
	},
);
