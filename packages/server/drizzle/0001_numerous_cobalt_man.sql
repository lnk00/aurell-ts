CREATE TABLE `bank-connections` (
	`id` text NOT NULL,
	`credentials` text NOT NULL,
	`userId` text,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bank-connections_id_unique` ON `bank-connections` (`id`);