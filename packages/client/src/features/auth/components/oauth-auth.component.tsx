import { useOAuthAuth } from '../hooks/use-oauth-auth.hook';

export function OAuthAuth() {
	const { isLoading, error } = useOAuthAuth();

	return (
		<div className="card w-96 bg-base-100 card-border">
			<div className="card-body">
				<h2 className="card-title">Authentication</h2>
				{isLoading ? (
					<div className="flex flex-col items-center gap-4 py-8">
						<div className="loading loading-spinner loading-lg" />
						<p>Verifying your login...</p>
					</div>
				) : error ? (
					<div className="alert alert-error">
						<span>{error}</span>
					</div>
				) : (
					<div className="alert alert-success">
						<span>Successfully authenticated! Redirecting...</span>
					</div>
				)}
			</div>
		</div>
	);
}
