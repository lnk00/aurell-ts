import { createFileRoute } from '@tanstack/react-router';
import { useApiVersion } from '@/features/core/api/useApiVersion';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useApiVersion();

	return (
		<div className="flex flex-col gap-2 items-center justify-center h-screen">
			<h1>{data?.name}</h1>
			<h2>{data?.version}</h2>
		</div>
	);
}
