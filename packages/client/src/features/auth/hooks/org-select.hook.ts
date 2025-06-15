import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import z from 'zod/v4';
import { orgSignin } from '../api/org/signin.api';

export function useOrgSelect(initialValue: string, token: string) {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { orgId: initialValue },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			const { sessionToken, sessionJwt } = await orgSignin(value.orgId, token);
			console.log('User successfully signed in: ', sessionToken, sessionJwt);
			setIsLoading(false);
		},
		validators: {
			onSubmit: ({ value }) => {
				try {
					z.string().parse(value.orgId);
					return undefined;
				} catch {
					return 'An org must be selected';
				}
			},
		},
	});

	return { form, isLoading };
}
