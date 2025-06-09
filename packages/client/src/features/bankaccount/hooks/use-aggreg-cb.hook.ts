import { getService } from '@/libs/ioc.lib';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export function useAggregCb() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const aggregService = getService('aggreg');

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const linkBankAccount = async () => {
			try {
				const urlParams = new URLSearchParams(window.location.search);
				const credentialsId = urlParams.get('credentialsId');

				if (!credentialsId) {
					throw new Error('No credential found in URL.');
				}

				await aggregService.linkBankAccount(credentialsId);

				setError(null);
				setIsLoading(false);
				setTimeout(() => navigate({ to: '/' }), 3000);
			} catch (err) {
				setIsLoading(false);
				setError('Bank account link failed.');
			}
		};

		linkBankAccount();
	}, []);

	return { error, isLoading };
}
