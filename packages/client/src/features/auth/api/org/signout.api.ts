import { throwIfResponseIsError } from '@/libs/error.lib';
import { queryClient } from '@/libs/query.lib';
import { rpcClient } from '@/libs/rpc.lib';

const QUERY_KEY = 'ORG_SIGNOUT_QUERY_KEY';

async function queryFn() {
	const res = await rpcClient.api.auth.signout.$post();
	throwIfResponseIsError(res);
	return await res.json();
}

export async function signout() {
	return queryClient.fetchQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(),
	});
}
