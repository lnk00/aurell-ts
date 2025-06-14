import { throwIfResponseIsError } from '@/libs/error.lib';
import { queryClient } from '@/libs/query.lib';
import { rpcClient } from '@/libs/rpc.lib';

const QUERY_KEY = 'MAGIC_LINK_VERIFY_QUERY_KEY';

async function queryFn(token: string) {
	const res = await rpcClient.api.auth.magiclink.verify.$post({
		form: { token },
	});
	throwIfResponseIsError(res);
	return await res.json();
}

export async function magiclinkVerify(token: string) {
	return queryClient.fetchQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => await queryFn(token),
	});
}
