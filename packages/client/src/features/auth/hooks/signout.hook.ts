import { signout as signoutApi } from '@/features/auth/api/org/signout.api';
import { useNavigate } from '@tanstack/react-router';

export function useSignout() {
	const navigate = useNavigate();

	const signout = async () => {
		await signoutApi();

		await navigate({
			to: '/auth/signin',
		});
	};

	return { signout };
}
