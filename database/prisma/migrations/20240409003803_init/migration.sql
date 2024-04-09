/*
  Warnings:

  - You are about to drop the column `paymemnt_id` on the `UserProperty` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `UserProperty` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roi_duration` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserProperty" DROP CONSTRAINT "UserProperty_paymemnt_id_fkey";

-- DropIndex
DROP INDEX "UserProperty_paymemnt_id_key";

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "roi_duration" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserProperty" DROP COLUMN "paymemnt_id",
ADD COLUMN     "payment_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserProperty_payment_id_key" ON "UserProperty"("payment_id");

-- AddForeignKey
ALTER TABLE "UserProperty" ADD CONSTRAINT "UserProperty_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
