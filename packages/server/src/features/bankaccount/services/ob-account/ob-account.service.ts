export interface ObAccountService {
	listAccounts: (userId: string) => Promise<
		{
			number: string;
			name: string;
			balance: number;
		}[]
	>;
}
