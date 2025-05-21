import { CookiesProvider } from 'react-cookie';

export function Provider({ children }: { children: React.ReactNode }) {
	return <CookiesProvider>{children}</CookiesProvider>;
}
