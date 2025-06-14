import { magiclinkVerify } from '@/features/auth/api/magiclink/verify.api';
import { AuthenticateErrorComponent } from '@/features/auth/components/magiclink/error.component';
import { OrgCreateComponent } from '@/features/auth/components/magiclink/org-create.component';
import { OrgSelectComponent } from '@/features/auth/components/magiclink/org-select.component';
import { AuthenticatePendingComponent } from '@/features/auth/components/magiclink/pending.component';
import { createFileRoute } from '@tanstack/react-router';
import z from 'zod/v4';

const searchParamsSchema = z.object({
	stytch_redirect_type: z.string().catch(() => ''),
	stytch_token_type: z.string().catch(() => ''),
	token: z.string().catch(() => ''),
});

export const Route = createFileRoute('/auth/magiclink/authenticate')({
	validateSearch: (search) => searchParamsSchema.parse(search),
	beforeLoad: async ({ search }) => search,
	loader: async ({ context }) => await magiclinkVerify(context.token),
	pendingComponent: AuthenticatePendingComponent,
	errorComponent: AuthenticateErrorComponent,
	component: RouteComponent,
});

function RouteComponent() {
	const { orgs, intermediateToken } = Route.useLoaderData();

	if (orgs.length === 0) {
		return <OrgCreateComponent token={intermediateToken} />;
	}

	return <OrgSelectComponent orgs={orgs} />;
}
