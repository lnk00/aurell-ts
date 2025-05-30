export interface ObCoreService {
	getLinkCode: (userId: string) => Promise<{ linkCode: string }>;
}
