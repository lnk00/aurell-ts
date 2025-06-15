import type { Context } from 'hono';
import { setCookie as setCookieHono } from 'hono/cookie';
import type { HonoContextType } from '../types/context.type';

export function setCookie(
	c: Context<HonoContextType>,
	name: string,
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
