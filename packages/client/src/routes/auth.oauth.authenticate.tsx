import { createFileRoute } from '@tanstack/react-router';
import { OAuthAuth } from '@/features/auth/components/oauth-auth.component';

export const Route = createFileRoute('/auth/oauth/authenticate')({
	component: RouteComponent,
});

function RouteComponent() {
	return <OAuthAuth />;
}
