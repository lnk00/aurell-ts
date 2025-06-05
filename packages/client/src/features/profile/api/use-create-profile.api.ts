import { queryClient } from '@/libs/query.lib';
import { rpcClient } from '@/libs/rpc.lib';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'CREATE_PROFILE';

async function queryFn(userId: string) {
	const res = await rpcClient.api.profile.create.$post({
		form: { userId },
	});
	return await res.json();
}

export function useCreateProfile(userId: string) {
	return useQuery({
		queryKey: [QUERY_KEY, userId],
		queryFn: async () => await queryFn(userId),
	});
}

export async function createProfile(userId: string) {
	return queryClient.fetchQuery({
		queryKey: [QUERY_KEY, userId],
		queryFn: async () => await queryFn(userId),
	});
}
