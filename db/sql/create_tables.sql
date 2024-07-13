// CREATE POSTGRES DATABASE

CREATE TABLE IF NOT EXISTS `users` (
  `id` SERIAL NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255),
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `cards` (
  `id` SERIAL NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `brand` VARCHAR(255) NOT NULL,
  `type` ENUM('debit', 'credit') NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users_cards` (
  `id` SERIAL NOT NULL,
  `user_id` INT NOT NULL,
  `card_id` INT NOT NULL,
  `last_four` VARCHAR(4) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`card_id`) REFERENCES `cards`(`id`)
);

CREATE TABLE IF NOT EXISTS `transactions` (
  `id` SERIAL NOT NULL,
  `user_card_id` INT NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `transaction_type` ENUM('debit', 'credit') NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_card_id`) REFERENCES `users_cards`(`id`)
);