import { injectable } from 'inversify';
import type { AggregService } from '../aggreg.service';
import { getLinkCode } from '@/features/bankaccount/api/get-link-code.api';

@injectable()
export class AggregTinkService implements AggregService {
	async openAggregator() {
		const code = await getLinkCode();
		console.log(code);
	}
}
