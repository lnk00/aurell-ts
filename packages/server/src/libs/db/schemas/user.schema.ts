import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('users', {
	id: text().notNull().unique(),
	fullName: text().default('default name'),
});
