import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './user.schema';

export const bankConnections = sqliteTable('bank-connections', {
	id: text().notNull().unique(),
	userId: text().references(() => users.id),
});
