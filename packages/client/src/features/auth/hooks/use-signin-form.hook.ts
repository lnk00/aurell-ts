import { useStytch } from '@stytch/react';
import { useForm } from '@tanstack/react-form';
import z from 'zod/v4';

export function useSigninForm() {
	const stytch = useStytch();

	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: async ({ value }) => {
			stytch.magicLinks.email.loginOrCreate(value.email, {
				login_magic_link_url:
					window.location.origin + import.meta.env.VITE_MAGIC_LINK_CB_URL,
				login_expiration_minutes: 60,
				signup_magic_link_url:
					window.location.origin + import.meta.env.VITE_MAGIC_LINK_CB_URL,
				signup_expiration_minutes: 60,
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

	// TODO: Implement Google signin
	const handleGoogleSignin = () => {
		throw 'Google signin not implemented';
	};

	// TODO: Implement Apple signin
	const handleAppleSignin = () => {
		throw 'Apple signin not implemented';
	};

	return { form, handleGoogleSignin, handleAppleSignin };
}
