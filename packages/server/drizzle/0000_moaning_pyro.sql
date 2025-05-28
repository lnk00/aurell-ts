CREATE TABLE `users` (
	`id` text NOT NULL,
	`fullName` text DEFAULT 'default name'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);