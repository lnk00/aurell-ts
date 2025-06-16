import { OAuthStytchService } from '@/features/auth/services/oauth/implementations/oauth-stytch.service';
import type { OAuthService } from '@/features/auth/services/oauth/oauth.service';
import type { AggregService } from '@/features/bankaccount/services/aggreg/aggreg.service';
import { AggregTinkService } from '@/features/bankaccount/services/aggreg/implementations/aggreg-tink.service';
import { Container } from 'inversify';

export const services: Container = new Container();

type ServiceTypeMap = {
	oauth: OAuthService;
	aggreg: AggregService;
};

services.bind<OAuthService>('oauth').to(OAuthStytchService);
services.bind<AggregService>('aggreg').to(AggregTinkService);

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
