/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `vendor_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `vendor_users_user_id_key` ON `vendor_users`(`user_id`);
