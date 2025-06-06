import { injectable } from 'inversify';
import type { AggregService } from '../aggreg.service';
import { getLinkCode } from '@/features/bankaccount/api/get-link-code.api';

@injectable()
export class AggregTinkService implements AggregService {
	async openAggregator() {
		const tinkLinkUrl = new URL('https://link.tink.com/1.0/credentials/add');

		const { code } = await getLinkCode();
		tinkLinkUrl.searchParams.append(
			'client_id',
			import.meta.env.VITE_TINK_CLIENT_ID as string,
		);
		tinkLinkUrl.searchParams.append(
			'redirect_uri',
			`${window.location.origin}/bankaccount/aggreg/callback`,
		);

		tinkLinkUrl.searchParams.append('authorization_code', code);
		window.location.href = tinkLinkUrl.toString();
	}
}
