import type { AggregService } from '@/features/bankaccount/services/aggreg/aggreg.service';
import { AggregTinkService } from '@/features/bankaccount/services/aggreg/implementations/aggreg-tink.service';
import { Container } from 'inversify';

export const services: Container = new Container();

type ServiceTypeMap = {
	aggreg: AggregService;
};

services.bind<AggregService>('aggreg').to(AggregTinkService);

export function getService<K extends keyof ServiceTypeMap>(
	serviceKey: K,
): ServiceTypeMap[K] {
	return services.get(serviceKey);
}
