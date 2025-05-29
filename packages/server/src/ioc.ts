import { Container } from 'inversify';
import type { SessionService } from './features/auth/services/session/session.service';
import { SessionStytchService } from './features/auth/services/session/implementations/session-stytch.service';

export const services: Container = new Container();

type ServiceTypeMap = {
	session: SessionService;
};

// services.bind<SessionService>('session').to(SessionStytchService);

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
