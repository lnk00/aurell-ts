export interface SessionService {
	isUserAuthenticated: () => boolean;
	revoke: () => Promise<void>;
}
