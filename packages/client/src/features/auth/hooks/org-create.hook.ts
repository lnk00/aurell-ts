import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import z from 'zod/v4';
import { orgCreate } from '../api/org/create.api';

export function useOrgCreate(token: string) {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { name: '' },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			const { sessionToken, sessionJwt } = await orgCreate(value.name, token);
			setIsLoading(false);
			console.log('User successfully signed in: ', sessionToken, sessionJwt);
		},
		validators: {
			onSubmit: ({ value }) => {
				try {
					z.string().min(1).max(128).parse(value.name);
					return undefined;
				} catch {
					return 'The name must be between 1 and 128 characters.';
				}
			},
		},
	});

	return { form, isLoading };
}
