import { useApiVersion } from '@/features/core/api/use-api-version.api';
import { ApiVersion } from '@/features/core/components/api-version.component';
import { stytchClient } from '@/libs/stytch.lib';
import { useStytchSession } from '@stytch/react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { session, isInitialized } = useStytchSession();
	const { data } = useApiVersion();
	const navigate = useNavigate({ from: '/' });

	useEffect(() => {
		if (!isInitialized) {
			return;
		}

		if (!session) {
			navigate({ to: '/auth/signin' });
		}
	}, [session, isInitialized, navigate]);

	return (
		<div className="flex flex-col gap-2 items-center justify-center h-screen">
			{data && <ApiVersion name={data.name} version={data.version} />}
			<button
				className="btn btn-soft"
				type="button"
				onClick={() => stytchClient.session.revoke()}
			>
				Sign out
			</button>
		</div>
	);
}
