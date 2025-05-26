export interface OAuthService {
	signinWithApple: () => Promise<void>;
	signinWithGoogle: () => Promise<void>;
	authenticate: (token: string) => Promise<string | null>;
}
