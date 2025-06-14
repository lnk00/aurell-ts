export interface OrgService {
	create(name: string): Promise<{ orgId: string }>;
}
