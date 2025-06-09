import { createProfile } from '@/features/profile/api/use-create-profile.api';
import { getService } from '@/libs/ioc.lib';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function useOAuthAuth() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const oauthService = getService('oauth');

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const authenticateToken = async () => {
			try {
				const params = new URLSearchParams(window.location.search);
				const token = params.get('token');

				if (!token) {
					throw new Error('No authentication token found in URL.');
				}

				const userId = await oauthService.authenticate(token);

				if (userId) {
					await createProfile(userId);

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
