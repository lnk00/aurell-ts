import { throwIfResponseIsError } from '@/libs/error.lib';
import { queryClient } from '@/libs/query.lib';
import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'LINK_BANK_ACCOUNT';

async function queryFn(bankAccountId: string) {
	const res = await rpcClient.api.ob.link.aggreg.$post({
		form: { bankAccountId },
	});
	throwIfResponseIsError(res);
	return await res.json();
}

export function useLinkBankAccount(id: string) {
	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(id),
	});
}

export async function linkBankAccount(id: string) {
	return queryClient.fetchQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(id),
	});
}
