import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
export const users = sqliteTable('users', {
	id: integer(),
	fullName: text(),
});
