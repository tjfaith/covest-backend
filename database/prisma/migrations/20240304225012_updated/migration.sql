-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('boot_admin', 'admin', 'retailer', 'user');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'user';
