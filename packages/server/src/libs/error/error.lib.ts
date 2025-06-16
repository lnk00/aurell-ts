import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { HonoContextType } from '../../types/context.type';

export const handleError = (err: Error, c: Context<HonoContextType>) => {
	let status: ContentfulStatusCode = 500;
	if (err instanceof HTTPException) status = err.status;

	return c.json(
		{
			success: false,
			error: {
				code: err.name,
				message: err.message,
			},
			timestamp: new Date().toISOString(),
		},
		status,
	);
};
