import type { ZodObject } from 'zod/v4';
import { TypeValidationError } from '../features/core/types/errors.type';
import type { ParsedFormValue } from 'hono/types';

export const Validate = <
	T extends ZodObject,
	Value extends Record<string, ParsedFormValue | ParsedFormValue[]>,
>(
	value: Value,
	schema: T,
) => {
	const parsed = schema.safeParse(value);
	if (!parsed.success) {
		throw new TypeValidationError(parsed.error.issues[0].message);
	}
	return parsed.data;
};
