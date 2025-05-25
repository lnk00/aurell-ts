import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';

export function useApiVersion() {
	const QUERY_KEY = 'API_VERSION';

	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => {
			const res = await rpcClient.api.core.infos.$get();
			return await res.json();
		},
	});
}
