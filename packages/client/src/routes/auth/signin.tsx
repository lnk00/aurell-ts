import { SigninForm } from '@/features/auth/components/signin-form.component';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/signin')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen flex flex-col gap-8 items-center justify-center">
			<h1 className="text-xl font-bold absolute top-8 left-8">Aurell</h1>
			<h2 className="text-6xl font-bold">Signin</h2>
			<SigninForm />
		</div>
	);
}
