import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod/v4';
import { orgSignin } from '../api/org/signin.api';

export function useOrgSelect(initialValue: string, token: string) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { orgId: initialValue },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			await orgSignin(value.orgId, token);
			setIsLoading(false);
			navigate({ to: '/' });
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
