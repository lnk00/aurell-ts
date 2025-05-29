import type { ClientResponse } from 'hono/client';

export type ErrorResponse = {
	success: boolean;
	error: {
		code: string;
		message: string;
	};
	timestamp: string;
};

export async function errorCaster(res: ClientResponse<unknown>) {
	return (await res.json()) as unknown as ErrorResponse;
}

export async function throwIfResponseIsError(res: ClientResponse<unknown>) {
	if (res.status !== 200) {
		const err = await errorCaster(res);
		throw new Error(err.error.message);
	}
}
