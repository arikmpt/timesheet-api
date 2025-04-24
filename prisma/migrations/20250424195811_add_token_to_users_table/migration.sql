-- AlterTable
ALTER TABLE "users" ADD COLUMN     "invitation_expired_at" TIMESTAMP,
ADD COLUMN     "invitation_token" TEXT,
ADD COLUMN     "reset_expired_at" TIMESTAMP,
ADD COLUMN     "reset_token" TEXT;
