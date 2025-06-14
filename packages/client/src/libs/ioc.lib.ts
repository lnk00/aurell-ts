import { OAuthStytchService } from '@/features/auth/services/oauth/implementations/oauth-stytch.service';
import type { OAuthService } from '@/features/auth/services/oauth/oauth.service';
import { SessionStytchService } from '@/features/auth/services/session/implementations/session-stytch.service';
import type { SessionService } from '@/features/auth/services/session/session.service';
import type { AggregService } from '@/features/bankaccount/services/aggreg/aggreg.service';
import { AggregTinkService } from '@/features/bankaccount/services/aggreg/implementations/aggreg-tink.service';
import { Container } from 'inversify';

export const services: Container = new Container();

type ServiceTypeMap = {
	session: SessionService;
	oauth: OAuthService;
	aggreg: AggregService;
};

services.bind<SessionService>('session').to(SessionStytchService);
services.bind<OAuthService>('oauth').to(OAuthStytchService);
services.bind<AggregService>('aggreg').to(AggregTinkService);

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
