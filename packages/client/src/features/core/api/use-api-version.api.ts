import { throwIfResponseIsError } from '@/libs/error.lib';
import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'GET_API_INFOS';

async function queryFn() {
	const res = await rpcClient.api.core.infos.$get();
	throwIfResponseIsError(res);
	return await res.json();
}

export function useApiVersion() {
	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(),
	});
}
