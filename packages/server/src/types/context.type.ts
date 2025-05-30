export type Bindings = {
	DB: D1Database;
	STYTCH_PROJECT_ID: string;
	STYTCH_SECRET: string;
	CLIENT_URL: string;
	TINK_CLIENT_ID: string;
	TINK_CLIENT_SECRET: string;
};

export type Variables = {
	userId: string | null;
	sessionId: string | null;
};

export type HonoContextType = {
	Variables: Variables;
	Bindings: Bindings;
};
