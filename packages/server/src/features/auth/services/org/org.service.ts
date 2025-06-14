export interface OrgService {
	create(
		name: string,
		intermediateToken: string,
	): Promise<{ sessionToken: string; sessionJwt: string }>;
}
