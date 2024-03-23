/*
  Warnings:

  - A unique constraint covering the columns `[paymemnt_id]` on the table `UserProperty` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserProperty" DROP CONSTRAINT "UserProperty_property_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProperty" DROP CONSTRAINT "UserProperty_user_id_fkey";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "user_property_id" TEXT;

-- AlterTable
ALTER TABLE "UserProperty" ADD COLUMN     "paymemnt_id" TEXT,
ALTER COLUMN "property_id" DROP NOT NULL,
ALTER COLUMN "user_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserProperty_paymemnt_id_key" ON "UserProperty"("paymemnt_id");

-- AddForeignKey
ALTER TABLE "UserProperty" ADD CONSTRAINT "UserProperty_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProperty" ADD CONSTRAINT "UserProperty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProperty" ADD CONSTRAINT "UserProperty_paymemnt_id_fkey" FOREIGN KEY ("paymemnt_id") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
