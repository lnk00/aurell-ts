import { useSignout } from '@/features/auth/hooks/use-signout.hook';
import { useApiVersion } from '@/features/core/api/use-api-version.api';
import { ApiVersion } from '@/features/core/components/api-version.component';
import { getService } from '@/libs/ioc.lib';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: RouteComponent,
	beforeLoad: async () => {
		const sessionService = getService('session');
		if (!sessionService.isUserAuthenticated()) {
			throw redirect({
				to: '/auth/signin',
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function RouteComponent() {
	const { signout } = useSignout();
	const { data } = useApiVersion();

	return (
		<div className="flex flex-col gap-2 items-center justify-center h-screen">
			{data && <ApiVersion name={data.name} version={data.version} />}
			<button className="btn btn-soft" type="button" onClick={() => signout()}>
				Sign out
			</button>
		</div>
	);
}
