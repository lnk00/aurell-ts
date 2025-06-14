import { Container } from 'inversify';
import { MagicLinkStytchService } from '../features/auth/services/magiclink/implementations/magiclink-stytch.service';
import type { MagicLinkService } from '../features/auth/services/magiclink/magiclink.service';
import { OrgStytchService } from '../features/auth/services/org/implementations/org-stytch.service';
import type { OrgService } from '../features/auth/services/org/org.service';
import { SessionStytchService } from '../features/auth/services/session/implementations/session-stytch.service';
import type { SessionService } from '../features/auth/services/session/session.service';
import { ObAccountTinkService } from '../features/bankaccount/services/ob-account/implementations/ob-account-tink.service';
import type { ObAccountService } from '../features/bankaccount/services/ob-account/ob-account.service';
import { ObCoreTinkService } from '../features/bankaccount/services/ob-core/implementations/ob-core-tink.service';
import type { ObCoreService } from '../features/bankaccount/services/ob-core/ob-core.service';
import type { Bindings } from '../types/context.type';

export const services: Container = new Container();
let isServicesInitialized = false;

export type ServiceTypeMap = {
	session: SessionService;
	magiclink: MagicLinkService;
	org: OrgService;
	obcore: ObCoreService;
	obaccount: ObAccountService;
};

export function initializeServices(env: Bindings) {
	if (isServicesInitialized) return;

	services.bind<SessionService>('session').toDynamicValue(() => {
		return new SessionStytchService(env);
	});

	services.bind<MagicLinkService>('magiclink').toDynamicValue(() => {
		return new MagicLinkStytchService(env);
	});

	services.bind<OrgService>('org').toDynamicValue(() => {
		return new OrgStytchService(env);
	});

	services.bind<ObCoreService>('obcore').toDynamicValue(() => {
		return new ObCoreTinkService(env);
	});

	services.bind<ObAccountService>('obaccount').toDynamicValue(() => {
		return new ObAccountTinkService(env);
	});

	isServicesInitialized = true;
}

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
