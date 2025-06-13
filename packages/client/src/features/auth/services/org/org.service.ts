export interface OrgService {
	discover(email: string): Promise<void>;
}
