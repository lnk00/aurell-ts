import { useAggregCb } from '@/features/bankaccount/hooks/use-aggreg-cb.hook';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bankaccount/link')({
	component: RouteComponent,
});

function RouteComponent() {
	const { isLoading, error } = useAggregCb();

	return (
		<div className="card w-96 bg-base-100 card-border">
			<div className="card-body">
				<h2 className="card-title">Bank account link</h2>
				{isLoading ? (
					<div className="flex flex-col items-center gap-4 py-8">
						<div className="loading loading-spinner loading-lg" />
						<p>Linking your account...</p>
					</div>
				) : error ? (
					<div className="alert alert-error">
						<span>{error}</span>
					</div>
				) : (
					<div className="alert alert-success">
						<span>Bank account succesfully linked! Redirecting...</span>
					</div>
				)}
			</div>
		</div>
	);
}
