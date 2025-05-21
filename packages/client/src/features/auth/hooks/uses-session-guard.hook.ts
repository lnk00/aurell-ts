import { getService } from '@/libs/ioc.lib';
import { useEffect } from 'react';

export function useSessionGuard() {
	const sessionService = getService('session');
	const redirectUrl = `${window.location.origin}/auth/signin`;

	const signout = async () => {
		await sessionService.revoke();
		window.location.href = redirectUrl;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!sessionService.isUserAuthenticated()) {
			window.location.href = redirectUrl;
		}
	}, []);

	return { signout };
}
