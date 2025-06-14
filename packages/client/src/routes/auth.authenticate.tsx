import { magiclinkVerify } from '@/features/auth/api/magiclink-verify.api';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod/v4';

const authenticateSearchParamsSchema = z.object({
	stytch_redirect_type: z.string().catch(() => ''),
	stytch_token_type: z.string().catch(() => ''),
	token: z.string().catch(() => ''),
});

export const Route = createFileRoute('/auth/authenticate')({
	validateSearch: (search) => authenticateSearchParamsSchema.parse(search),
	beforeLoad: async ({ search }) => search,
	loader: async ({ context }) => await magiclinkVerify(context.token),
	pendingComponent: PendingComponent,
	errorComponent: ErrorComponent,
	component: RouteComponent,
});

function PendingComponent() {
	return (
		<div className="mt-4 p-4 bg-info border border-info-content rounded">
			<p className="text-info-content font-semibold">Pending...</p>
			<p className="text-info-content text-sm mt-1">
				We are verifying your login.
			</p>
		</div>
	);
}

function ErrorComponent() {
	return (
		<div className="mt-4 p-4 bg-error border border-error-content rounded">
			<p className="text-error-content font-semibold">Error details:</p>
			<p className="text-error-content text-sm mt-1">
				We could not authenticate you. Please try again.
			</p>
		</div>
	);
}

function RouteComponent() {
	const { orgs, intermediateToken } = Route.useLoaderData();

	if (!orgs) {
		return (
			<div>
				<p>No orgs found, create one</p>
				<p>token: {intermediateToken}</p>
			</div>
		);
	}

	return (
		<div>
			<p>orgs:</p>
			{orgs.map((org) => (
				<p key={org.id}>{org.name}</p>
			))}
			<p>token: {intermediateToken}</p>
		</div>
	);
}
