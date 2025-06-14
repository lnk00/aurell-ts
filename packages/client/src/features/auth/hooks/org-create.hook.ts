import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import z from 'zod/v4';
import { orgCreate } from '../api/org/create.api';

export function useOrgCreate() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { name: '' },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			const { orgId } = await orgCreate(value.name);
			setIsLoading(false);
			console.log('Organization created successfully: ', orgId);
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
