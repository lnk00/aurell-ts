import { Container } from 'inversify';
import type { SessionService } from '../features/auth/services/session/session.service';
import type { Bindings } from '../bindings';
import { SessionStytchService } from '../features/auth/services/session/implementations/session-stytch.service';
import type { ObCoreService } from '../features/openbanking/services/ob-core/ob-core.service';
import { ObCoreTinkService } from '../features/openbanking/services/ob-core/implementations/ob-core-tink.service';

export const services: Container = new Container();
let isServicesInitialized = false;

export type ServiceTypeMap = {
	session: SessionService;
	obcore: ObCoreService;
};

export function initializeServices(env: Bindings) {
	if (isServicesInitialized) return;

	services.bind<SessionService>('session').toDynamicValue(() => {
		return new SessionStytchService(env);
	});

	services.bind<ObCoreService>('obcore').toDynamicValue(() => {
		return new ObCoreTinkService(env);
	});

	isServicesInitialized = true;
}

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
