export interface SessionService {
	verifyJwt: (
		token: string,
	) => Promise<{ userId: string; sessionId: string; sessionJwt: string }>;
	signout: (token: string) => Promise<void>;
}
