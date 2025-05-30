export interface ObCoreService {
	createUser: (userId: string) => Promise<{ obProviderUserId: string }>;
	createDelegatedAuth: (
		userId: string,
		hint: string,
	) => Promise<{ delegatedAuthCode: string }>;
}
