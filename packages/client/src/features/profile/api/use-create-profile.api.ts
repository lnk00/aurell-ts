import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';

export function useCreateProfile() {
	const QUERY_KEY = 'CREATE_PROFILE';

	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => {
			const res = await rpcClient.api.profile.create.$get();
			return await res.json();
		},
		enabled: false,
	});
}
