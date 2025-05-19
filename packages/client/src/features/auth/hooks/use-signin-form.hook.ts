import { useForm } from '@tanstack/react-form';
import z from 'zod/v4';

export function useSigninForm() {
	const form = useForm({
		defaultValues: { email: '' },
		onSubmit: async () => {},
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
