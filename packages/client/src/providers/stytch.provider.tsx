import { stytchClient } from '@/libs/stytch.lib';
import { StytchB2BProvider } from '@stytch/react/b2b';

export function Provider({ children }: { children: React.ReactNode }) {
	return (
		<StytchB2BProvider stytch={stytchClient}>{children}</StytchB2BProvider>
	);
}
