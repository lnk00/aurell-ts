import { HTTPException } from 'hono/http-exception';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export class TypeValidationError extends HTTPException {
	constructor(message: string, status: ContentfulStatusCode = 400) {
		super(status, { message });
		this.name = 'TypeValidationError';
	}
}

export class DatabaseError extends HTTPException {
	constructor(message: string, status: ContentfulStatusCode = 500) {
		super(status, { message });
		this.name = 'DatabaseError';
	}
}

export class OpenbankingError extends HTTPException {
	constructor(message: string, status: ContentfulStatusCode = 400) {
		super(status, { message });
		this.name = 'OpenbankingError';
	}
}

export class NotAuthenticatedError extends HTTPException {
	constructor(message: string, status: ContentfulStatusCode = 401) {
		super(status, { message });
		this.name = 'NotAuthenticatedError';
	}
}
