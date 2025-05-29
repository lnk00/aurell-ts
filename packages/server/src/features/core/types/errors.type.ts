import { HTTPException } from 'hono/http-exception';

export class TypeValidationError extends HTTPException {
	constructor(message: string) {
		super(400, { message });
		this.name = 'TypeValidationError';
	}
}

export class NotAuthenticatedError extends HTTPException {
	constructor(message: string) {
		super(401, { message });
		this.name = 'NotAuthenticatedError';
	}
}
