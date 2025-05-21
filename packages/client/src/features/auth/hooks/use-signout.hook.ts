import { getService } from '@/libs/ioc.lib';

export function useSignout() {
	const sessionService = getService('session');
	const redirectUrl = `${window.location.origin}/auth/signin`;

	const signout = async () => {
		await sessionService.revoke();
		window.location.href = redirectUrl;
	};

	return { signout };
}
