export interface SessionService {
	verifyJwt: (token: string) => Promise<void>;
}
