export function useSignout() {
	const redirectUrl = `${window.location.origin}/auth/signin`;

	const signout = async () => {
		window.location.href = redirectUrl;
	};

	return { signout };
}
