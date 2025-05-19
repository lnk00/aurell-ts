import { useForm } from '@tanstack/react-form';
import z from 'zod/v4';

export function useSigninForm() {
	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: async ({ value }) => {
			console.log(value);
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
		throw 'Implement Google signin';
	};

	// TODO: Implement Apple signin
	const handleAppleSignin = () => {
		throw 'Implement Apple signin';
	};

	return { form, handleGoogleSignin, handleAppleSignin };
}
