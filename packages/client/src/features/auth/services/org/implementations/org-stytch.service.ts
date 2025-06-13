import { stytchClient } from '@/libs/stytch.lib';
import type { OrgService } from '../org.service';

export class OrgStytchService implements OrgService {
	redirectUrl = window.location.origin + import.meta.env.VITE_ORG_DISCOVERY_URL;

	async discover(email: string): Promise<void> {
		console.log(email);
		await stytchClient.magicLinks.email.discovery.send({
			email_address: email,
			discovery_redirect_url: this.redirectUrl,
		});
	}
}
