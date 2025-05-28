import { useCreateProfile } from '@/features/profile/api/use-create-profile.api';
import { getService } from '@/libs/ioc.lib';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function useMagicLinkAuth() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const magicLinkService = getService('magiclink');
	const { refetch: createProfile } = useCreateProfile();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const authenticateToken = async () => {
			try {
				const params = new URLSearchParams(window.location.search);
				const token = params.get('token');

				if (!token) {
					throw new Error('No authentication token found in URL.');
				}

				const userId = await magicLinkService.authenticate(token);
				await createProfile();

				if (userId) {
					setError(null);
					setIsLoading(false);
					setTimeout(() => navigate({ to: '/' }), 3000);
				} else {
					throw new Error('Authentication failed.');
				}
			} catch (err) {
				setIsLoading(false);
				setError('Authentication failed.');
			}
		};

		authenticateToken();
	}, []);

	return { error, isLoading };
}
