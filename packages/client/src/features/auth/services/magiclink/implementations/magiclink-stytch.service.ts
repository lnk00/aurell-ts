import { stytchClient } from '@/libs/stytch.lib';
import type { MagicLinkService } from '../magiclink.service';
import { injectable } from 'inversify';

@injectable()
export class MagicLinkStytchService implements MagicLinkService {
	redirectUrl = window.location.origin + import.meta.env.VITE_MAGIC_LINK_CB_URL;
	linkExpirationTime = 60;
	sessionDuration = 60;

	async send(email: string) {
		await stytchClient.magicLinks.email.loginOrCreate(email, {
			login_magic_link_url: this.redirectUrl,
			login_expiration_minutes: this.linkExpirationTime,
			signup_magic_link_url: this.redirectUrl,
			signup_expiration_minutes: this.linkExpirationTime,
		});
	}

	async authenticate(token: string) {
		const response = await stytchClient.magicLinks.authenticate(token, {
			session_duration_minutes: this.sessionDuration,
		});

		if (response.status_code !== 200) return null;

		return response.user_id;
	}
}
