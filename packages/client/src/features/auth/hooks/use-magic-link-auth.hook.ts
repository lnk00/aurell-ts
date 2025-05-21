import { useStytch } from '@stytch/react';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function useMagicLinkAuth() {
	const stytch = useStytch();
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const authenticateToken = async () => {
			try {
				const params = new URLSearchParams(window.location.search);
				const token = params.get('token');

				if (!token) {
					throw new Error('No authentication token found in URL.');
				}

				const response = await stytch.magicLinks.authenticate(token, {
					session_duration_minutes: 60,
				});

				if (response.status_code === 200) {
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
	}, [stytch, navigate]);

	return { error, isLoading };
}
