import { getService } from '@/libs/ioc.lib';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import z from 'zod/v4';
import { useState } from 'react';

export function useSigninForm() {
	const navigate = useNavigate();
	const magicLinkService = getService('magiclink');
	const oauthService = getService('oauth');
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: async ({ value }) => {
			setIsLoading(true);
			await magicLinkService.send(value.email);
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
