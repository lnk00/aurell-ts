import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

export function useApiVersion() {
	const [cookies] = useCookies(['stytch_session_jwt']);

	return useQuery({
		queryKey: ['API_VERSION'],
		queryFn: async () => {
			const res = await rpcClient.api.core.infos.$get(
				{},
				{
					headers: {
						Authorization: `Bearer ${cookies.stytch_session_jwt}`,
					},
				},
			);
			return await res.json();
		},
	});
}
