export interface SessionService {
	verifyJwt: (
		token: string,
	) => Promise<{ userId: string; sessionId: string; sessionJwt: string }>;
	signOut: (token: string) => Promise<void>;
}
