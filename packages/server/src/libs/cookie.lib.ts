import type { Context } from 'hono';
import {
	deleteCookie as deleteCookieHono,
	getCookie as getCookieHono,
	setCookie as setCookieHono,
} from 'hono/cookie';
import type { HonoContextType } from '../types/context.type';

export function setCookie(
	c: Context<HonoContextType>,
	name: 'aurell_session' | 'aurell_session_jwt',
	value: string,
) {
	const cookieOptions: Parameters<typeof setCookieHono>[3] = {
		sameSite: 'Lax',
	};
	if (!c.env.CLIENT_URL.includes('localhost')) {
		cookieOptions.domain = '.aurell.app';
		cookieOptions.secure = true;
	}

	setCookieHono(c, name, value, cookieOptions);
}

export function deleteCookie(
	c: Context<HonoContextType>,
	name: 'aurell_session' | 'aurell_session_jwt',
) {
	const cookieOptions: Parameters<typeof setCookieHono>[3] = {
		sameSite: 'Lax',
	};
	if (!c.env.CLIENT_URL.includes('localhost')) {
		cookieOptions.domain = '.aurell.app';
		cookieOptions.secure = true;
	}

	deleteCookieHono(c, name, cookieOptions);
}

export function getCookie(
	c: Context<HonoContextType>,
	name: 'aurell_session' | 'aurell_session_jwt',
) {
	return getCookieHono(c, name);
}
