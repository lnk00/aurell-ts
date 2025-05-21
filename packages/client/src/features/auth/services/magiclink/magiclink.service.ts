export interface MagicLinkService {
	send: (email: string) => Promise<void>;
	authenticate: (token: string) => Promise<string | null>;
}
