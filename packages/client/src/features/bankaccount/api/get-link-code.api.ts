import { throwIfResponseIsError } from '@/libs/error.lib';
import { queryClient } from '@/libs/query.lib';
import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'GET_LINK_CODE';

async function queryFn() {
	const res = await rpcClient.api.ob.link.code.$get();
	throwIfResponseIsError(res);
	return await res.json();
}

export function useGetLinkCode() {
	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(),
	});
}

export async function getLinkCode() {
	return queryClient.fetchQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(),
	});
}
