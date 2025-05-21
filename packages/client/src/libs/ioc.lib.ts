import { MagicLinkStytchService } from '@/features/auth/services/magiclink/implementations/magiclink-stytch.service';
import type { MagicLinkService } from '@/features/auth/services/magiclink/magiclink.service';
import { SessionStytchService } from '@/features/auth/services/session/implementations/session-stytch.service';
import type { SessionService } from '@/features/auth/services/session/session.service';
import { Container } from 'inversify';

export const services: Container = new Container();

type ServiceTypeMap = {
	magiclink: MagicLinkService;
	session: SessionService;
};

services.bind<MagicLinkService>('magiclink').to(MagicLinkStytchService);
services.bind<SessionService>('session').to(SessionStytchService);

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
