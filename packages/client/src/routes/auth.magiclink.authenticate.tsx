import { createFileRoute } from '@tanstack/react-router';
import { MagicLinkAuth } from '@/features/auth/components/magic-link-auth.component';

export const Route = createFileRoute('/auth/magiclink/authenticate')({
	component: RouteComponent,
});

function RouteComponent() {
	return <MagicLinkAuth />;
}
