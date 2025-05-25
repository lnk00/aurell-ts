import { StytchHeadlessClient } from '@stytch/vanilla-js/headless';

const stytchOptions = {
	cookieOptions: {
		opaqueTokenCookieName: 'stytch_session',
		jwtCookieName: 'stytch_session_jwt',
		availableToSubdomains: true,
		domain: 'aurell.app',
	},
};

export const stytchClient = new StytchHeadlessClient(
	import.meta.env.VITE_STYTCH_PUBLIC_TOKEN,
	stytchOptions,
);
