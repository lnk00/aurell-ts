import { getLinkCode } from '@/features/openbanking/api/get-link-code.api';
import { injectable } from 'inversify';
import type { LinkService } from '../link.service';

@injectable()
export class LinkTinkService implements LinkService {
	async openLinker() {
		const code = await getLinkCode();
		console.log(code);
	}
}
