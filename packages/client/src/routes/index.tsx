import { useApiVersion } from '@/features/core/api/use-api-version.api';
import { ApiVersion } from '@/features/core/components/api-version.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useApiVersion();

	return (
		<div className="flex flex-col gap-2 items-center justify-center h-screen">
			{data && <ApiVersion name={data.name} version={data.version} />}
		</div>
	);
}
