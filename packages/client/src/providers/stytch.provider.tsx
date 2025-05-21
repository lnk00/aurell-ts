import { stytchClient } from '@/libs/stytch.lib';
import { StytchProvider } from '@stytch/react';

export function Provider({ children }: { children: React.ReactNode }) {
	return <StytchProvider stytch={stytchClient}>{children}</StytchProvider>;
}
