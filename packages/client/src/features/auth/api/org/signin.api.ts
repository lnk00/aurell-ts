import { throwIfResponseIsError } from '@/libs/error.lib';
import { queryClient } from '@/libs/query.lib';
import { rpcClient } from '@/libs/rpc.lib';

const QUERY_KEY = 'ORG_SIGNIN_QUERY_KEY';

async function queryFn(id: string, token: string) {
	const res = await rpcClient.api.auth.org.signin.$post({
		form: { id, token },
	});
	throwIfResponseIsError(res);
	return await res.json();
}

export async function orgSignin(id: string, token: string) {
	return queryClient.fetchQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(id, token),
	});
}
