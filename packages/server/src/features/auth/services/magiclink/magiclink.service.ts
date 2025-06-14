export interface MagicLinkService {
	sendEmail(email: string): Promise<void>;
	verify(
		token: string,
	): Promise<{
		token: string;
		orgs: { id: string; name: string; logo: string }[];
	}>;
}
