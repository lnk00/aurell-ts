import { getService } from '@/libs/ioc.lib';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod/v4';

export function useSigninForm() {
	const navigate = useNavigate();
	const orgService = getService('org');
	const oauthService = getService('oauth');
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			await orgService.discover(value.email);
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
		await oauthService.signinWithGoogle();
	};

	const handleAppleSignin = async () => {
		await oauthService.signinWithApple();
	};

	return { form, handleGoogleSignin, handleAppleSignin, isLoading };
}
