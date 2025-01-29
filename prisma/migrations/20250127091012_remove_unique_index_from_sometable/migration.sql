-- DropIndex
DROP INDEX `contracts_code_key` ON `contracts`;

-- DropIndex
DROP INDEX `vendors_name_key` ON `vendors`;

-- CreateIndex
CREATE INDEX `contracts_code_start_date_end_date_hourly_rate_min_hour_per__idx` ON `contracts`(`code`, `start_date`, `end_date`, `hourly_rate`, `min_hour_per_week`, `max_hour_per_week`);

-- CreateIndex
CREATE INDEX `vendors_name_idx` ON `vendors`(`name`);
