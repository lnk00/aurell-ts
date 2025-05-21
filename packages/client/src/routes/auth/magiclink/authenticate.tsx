import { createFileRoute } from '@tanstack/react-router';
import { MagicLinkAuth } from '@/features/auth/components/magic-link-auth.component';

export const Route = createFileRoute('/auth/magiclink/authenticate')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen bg-base-200 flex items-center justify-center">
			<MagicLinkAuth />
		</div>
	);
}
