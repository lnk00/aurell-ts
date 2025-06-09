export interface AggregService {
	openAggregator: () => Promise<void>;
	linkBankAccount: (id: string) => Promise<void>;
}
