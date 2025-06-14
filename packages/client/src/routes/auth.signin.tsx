import { SigninComponent } from '@/features/auth/components/signin.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/signin')({
	component: RouteComponent,
});

function RouteComponent() {
	return <SigninComponent />;
}
