import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/libs/db/schemas',
	driver: 'd1-http',
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID as string,
		token: process.env.CLOUDFLARE_D1_TOKEN as string,
	},
});
