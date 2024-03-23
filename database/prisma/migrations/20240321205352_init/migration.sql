/*
  Warnings:

  - You are about to drop the column `user_id` on the `Property` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ROIDuration" AS ENUM ('annually');

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_user_id_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "user_id",
ADD COLUMN     "roi" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "roi_duration" "ROIDuration" NOT NULL DEFAULT 'annually',
ADD COLUMN     "total_units" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user_property_id" TEXT;

-- CreateTable
CREATE TABLE "UserProperty" (
    "id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "roi" DOUBLE PRECISION NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "unit_bought" DOUBLE PRECISION NOT NULL,
    "total_amount_paid" DOUBLE PRECISION NOT NULL,
    "estimated_roi" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserProperty" ADD CONSTRAINT "UserProperty_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProperty" ADD CONSTRAINT "UserProperty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
