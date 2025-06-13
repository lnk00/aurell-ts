import { StytchB2BHeadlessClient } from '@stytch/vanilla-js/b2b/headless';

const stytchOptions = {
	cookieOptions: {
		opaqueTokenCookieName: 'aurell_session',
		jwtCookieName: 'aurell_session_jwt',
		availableToSubdomains: true,
		domain: 'aurell.app',
	},
};

export const stytchClient = new StytchB2BHeadlessClient(
	import.meta.env.VITE_STYTCH_PUBLIC_TOKEN,
	stytchOptions,
);
