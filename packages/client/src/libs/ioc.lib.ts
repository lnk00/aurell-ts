import { MagicLinkStytchService } from '@/features/auth/services/magiclink/implementations/magiclink-stytch.service';
import type { MagicLinkService } from '@/features/auth/services/magiclink/magiclink.service';
import { OAuthStytchService } from '@/features/auth/services/oauth/implementations/oauth-stytch.service';
import type { OAuthService } from '@/features/auth/services/oauth/oauth.service';
import { SessionStytchService } from '@/features/auth/services/session/implementations/session-stytch.service';
import type { SessionService } from '@/features/auth/services/session/session.service';
import { LinkTinkService } from '@/features/openbanking/services/link/implementations/link-tink.service';
import type { LinkService } from '@/features/openbanking/services/link/link.service';
import { Container } from 'inversify';

export const services: Container = new Container();

type ServiceTypeMap = {
	magiclink: MagicLinkService;
	session: SessionService;
	oauth: OAuthService;
	link: LinkService;
};

services.bind<MagicLinkService>('magiclink').to(MagicLinkStytchService);
services.bind<SessionService>('session').to(SessionStytchService);
services.bind<OAuthService>('oauth').to(OAuthStytchService);
services.bind<LinkService>('link').to(LinkTinkService);

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
