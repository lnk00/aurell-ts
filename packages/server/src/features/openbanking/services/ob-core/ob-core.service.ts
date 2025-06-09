export interface ObCoreService {
	getLinkCode: (userId: string) => Promise<{ linkCode: string }>;
	listAccounts: (userId: string) => Promise<void>;
}
