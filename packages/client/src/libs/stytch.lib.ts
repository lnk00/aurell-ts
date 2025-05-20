import { StytchHeadlessClient } from '@stytch/vanilla-js/headless';

const stytchOptions = {
	cookieOptions: {
		opaqueTokenCookieName: 'stytch_session',
		jwtCookieName: 'stytch_session_jwt',
		path: '',
		availableToSubdomains: false,
		domain: '',
	},
};

export const stytchClient = new StytchHeadlessClient(
	import.meta.env.VITE_STYTCH_PUBLIC_TOKEN,
	stytchOptions,
);
