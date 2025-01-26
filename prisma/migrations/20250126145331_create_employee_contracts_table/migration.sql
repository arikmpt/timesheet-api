-- CreateTable
CREATE TABLE `employee_contracts` (
    `employee_id` INTEGER NOT NULL,
    `contract_id` INTEGER NOT NULL,
    `vendor_id` INTEGER NOT NULL,

    PRIMARY KEY (`employee_id`, `contract_id`, `vendor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee_contracts` ADD CONSTRAINT `employee_contracts_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_contracts` ADD CONSTRAINT `employee_contracts_contract_id_fkey` FOREIGN KEY (`contract_id`) REFERENCES `contracts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `employee_contracts` ADD CONSTRAINT `employee_contracts_vendor_id_fkey` FOREIGN KEY (`vendor_id`) REFERENCES `vendors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
