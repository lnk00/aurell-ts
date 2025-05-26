import { createFileRoute } from '@tanstack/react-router';
import { OAuthAuth } from '@/features/auth/components/oauth-auth.component';

export const Route = createFileRoute('/auth/oauth/authenticate')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen bg-base-200 flex items-center justify-center">
			<OAuthAuth />
		</div>
	);
}
