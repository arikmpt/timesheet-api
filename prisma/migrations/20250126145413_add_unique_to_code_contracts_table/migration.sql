/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `contracts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `contracts_code_key` ON `contracts`(`code`);
