import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

export function useApiVersion() {
	const QUERY_KEY = 'API_VERSION';
	const [{ stytch_session_jwt }] = useCookies(['stytch_session_jwt']);

	return useQuery({
		queryKey: [QUERY_KEY],
		queryFn: async () => {
			const res = await rpcClient.api.core.infos.$get(
				{},
				{
					headers: {
						Authorization: `Bearer ${stytch_session_jwt}`,
					},
				},
			);
			return await res.json();
		},
	});
}
