import { MagicLinkConfirmation } from '@/features/auth/components/magic-link-confirmation.component';
import { createFileRoute, useSearch } from '@tanstack/react-router';

export const Route = createFileRoute('/auth/magiclink/confirmation')({
	validateSearch: (search: Record<string, unknown>) => {
		return {
			email: (search.email as string) || '',
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { email } = useSearch({ from: '/auth/magiclink/confirmation' });

	return (
		<div className="h-screen flex items-center justify-center">
			<MagicLinkConfirmation email={email} />
		</div>
	);
}
