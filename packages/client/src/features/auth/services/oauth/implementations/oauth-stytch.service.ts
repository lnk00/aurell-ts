import { stytchClient } from '@/libs/stytch.lib';
import type { OAuthService } from '../oauth.service';
import { injectable } from 'inversify';

@injectable()
export class OAuthStytchService implements OAuthService {
	redirectUrl = window.location.origin + import.meta.env.VITE_OAUTH_CB_URL;
	sessionDuration = 60;

	async signinWithApple() {
		await stytchClient.oauth.apple.start({
			login_redirect_url: this.redirectUrl,
			signup_redirect_url: this.redirectUrl,
		});
	}

	async signinWithGoogle() {
		await stytchClient.oauth.google.start({
			login_redirect_url: this.redirectUrl,
			signup_redirect_url: this.redirectUrl,
		});
	}

	async authenticate(token: string) {
		const response = await stytchClient.oauth.authenticate(token, {
			session_duration_minutes: this.sessionDuration,
		});

		if (response.status_code !== 200) return null;

		return response.user_id;
	}
}
