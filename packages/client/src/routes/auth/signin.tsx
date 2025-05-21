import { SigninForm } from '@/features/auth/components/signin-form.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/signin')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen bg-base-200 flex items-center justify-center">
			<SigninForm />
		</div>
	);
}
