import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod/v4';
import { orgCreate } from '../api/org/create.api';

export function useOrgCreate(token: string) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { name: '' },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			await orgCreate(value.name, token);
			setIsLoading(false);
			navigate({ to: '/' });
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
