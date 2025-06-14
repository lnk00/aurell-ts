import { MailSentComponent } from '@/features/auth/components/magiclink/mail-sent.component';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import z from 'zod/v4';

const searchParamsSchema = z.object({
	email: z.string().catch(() => ''),
});

export const Route = createFileRoute('/auth/magiclink/confirmation')({
	validateSearch: (search) => searchParamsSchema.parse(search),
	component: RouteComponent,
});

function RouteComponent() {
	const { email } = useSearch({ from: '/auth/magiclink/confirmation' });
	return <MailSentComponent email={email} />;
}
