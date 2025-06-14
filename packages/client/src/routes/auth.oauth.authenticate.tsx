import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/oauth/authenticate')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>oauth authenticate</div>;
}
