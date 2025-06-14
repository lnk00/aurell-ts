import { throwIfResponseIsError } from '@/libs/error.lib';
import { queryClient } from '@/libs/query.lib';
import { rpcClient } from '@/libs/rpc.lib';

const QUERY_KEY = 'ORG_CREATE_QUERY_KEY';

async function queryFn(name: string) {
	const res = await rpcClient.api.auth.org.create.$post({
		form: { name },
	});
	throwIfResponseIsError(res);
	return await res.json();
}

export async function orgCreate(name: string) {
	return queryClient.fetchQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(name),
	});
}
