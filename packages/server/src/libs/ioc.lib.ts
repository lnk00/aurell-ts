import { Container } from 'inversify';
import { SessionStytchService } from '../features/auth/services/session/implementations/session-stytch.service';
import type { SessionService } from '../features/auth/services/session/session.service';
import { ObCoreTinkService } from '../features/bankaccount/services/ob-core/implementations/ob-core-tink.service';
import type { ObCoreService } from '../features/bankaccount/services/ob-core/ob-core.service';
import type { Bindings } from '../types/context.type';

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
