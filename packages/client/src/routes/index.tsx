import { useSessionGuard } from '@/features/auth/hooks/uses-session-guard.hook';
import { useApiVersion } from '@/features/core/api/use-api-version.api';
import { ApiVersion } from '@/features/core/components/api-version.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { signout } = useSessionGuard();
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
