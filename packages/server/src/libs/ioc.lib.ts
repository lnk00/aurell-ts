import { Container } from 'inversify';
import type { SessionService } from '../features/auth/services/session/session.service';
import type { Bindings } from '../bindings';
import { SessionStytchService } from '../features/auth/services/session/implementations/session-stytch.service';

export const services: Container = new Container();
let isServicesInitialized = false;

type ServiceTypeMap = {
	session: SessionService;
};

export function initializeServices(env: Bindings) {
	if (isServicesInitialized) return;

	services.bind<SessionService>('session').toDynamicValue(() => {
		return new SessionStytchService(env);
	});

	isServicesInitialized = true;
}

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
