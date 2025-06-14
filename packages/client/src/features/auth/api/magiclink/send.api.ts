import { throwIfResponseIsError } from '@/libs/error.lib';
import { queryClient } from '@/libs/query.lib';
import { rpcClient } from '@/libs/rpc.lib';

const QUERY_KEY = 'MAGIC_LINK_SEND_QUERY_KEY';

async function queryFn(email: string) {
	const res = await rpcClient.api.auth.magiclink.send.$post({
		form: { email },
	});
	throwIfResponseIsError(res);
	return await res.json();
}

export async function magiclinkSend(token: string) {
	return queryClient.fetchQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(token),
	});
}
