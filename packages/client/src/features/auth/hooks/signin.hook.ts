import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod/v4';
import { magiclinkSend } from '../api/magiclink/send.api';

export function useSignin() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			await magiclinkSend(value.email);
			setIsLoading(false);
			navigate({
				to: '/auth/magiclink/confirmation',
				search: { email: value.email },
			});
		},
		validators: {
			onSubmit: ({ value }) => {
				try {
					z.email().parse(value.email);
					return undefined;
				} catch {
					return 'Email invalid, please enter a valid email.';
				}
			},
		},
	});

	const handleGoogleSignin = async () => {
		//TODO: Use backend service
	};

	const handleAppleSignin = async () => {
		//TODO: Use backend service
	};

	return { form, handleGoogleSignin, handleAppleSignin, isLoading };
}
