import { MagicLinkStytchService } from '@/features/auth/services/magiclink/implementations/magiclink-stytch.service';
import type { MagicLinkService } from '@/features/auth/services/magiclink/magiclink.service';
import { Container } from 'inversify';

export const services: Container = new Container();

type ServiceTypeMap = {
	magiclink: MagicLinkService;
};

services.bind<MagicLinkService>('magiclink').to(MagicLinkStytchService);

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
