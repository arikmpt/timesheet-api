/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_user_id_fkey`;

-- DropTable
DROP TABLE `profile`;

-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(80) NOT NULL,
    `last_name` VARCHAR(80) NOT NULL,
    `contact_number` VARCHAR(25) NULL,
    `country_code` VARCHAR(5) NULL,
    `birth_of_date` DATETIME(3) NULL,
    `place_of_birth` VARCHAR(191) NULL,
    `address` TEXT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
