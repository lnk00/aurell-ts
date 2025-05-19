import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';

export function useApiVersion() {
	return useQuery({
		queryKey: ['API_VERSION'],
		queryFn: async () => {
			const res = await rpcClient.api.core.infos.$get();
			return await res.json();
		},
	});
}
