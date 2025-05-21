import { useNavigate } from '@tanstack/react-router';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

interface MagicLinkConfirmationProps {
	email?: string;
}

export function MagicLinkConfirmation({ email }: MagicLinkConfirmationProps) {
	const navigate = useNavigate();

	return (
		<div className="card w-96 bg-base-100 card-border">
			<div className="card-body">
				<h2 className="card-title">Check your email</h2>
				<div className="py-4 flex flex-col gap-4">
					<div className="flex flex-col items-center">
						<EnvelopeIcon className="h-16" />
					</div>

					<p className="text-center">
						We've sent a sign in link to{' '}
						<span className="font-bold">{email || 'your email address'}</span>.
					</p>

					<p className="text-center text-sm text-gray-500">
						Please check your inbox and click on the link in the email to
						complete the sign in process.
					</p>

					<div className="divider">or</div>

					<button
						className="btn btn-soft btn-block"
						onClick={() => navigate({ to: '/auth/signin' })}
						type="button"
					>
						Return to sign in
					</button>
				</div>
			</div>
		</div>
	);
}
