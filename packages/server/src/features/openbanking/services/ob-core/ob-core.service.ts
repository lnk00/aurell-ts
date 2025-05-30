export interface ObCoreService {
	createDelegatedAuth: (userId: string, hint: string) => Promise<string>;
}
