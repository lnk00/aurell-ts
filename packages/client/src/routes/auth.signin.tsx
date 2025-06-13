import { SigninForm } from '@/features/auth/components/signin-form.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/signin')({
	component: RouteComponent,
});

function RouteComponent() {
	return <SigninForm />;
}
