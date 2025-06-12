export interface ObCoreService {
	getLinkCode: (userId: string) => Promise<{ linkCode: string }>;
	getUserAccessToken: (userId: string) => Promise<{ token: string }>;
	listAccounts: (userId: string) => Promise<void>;
}
