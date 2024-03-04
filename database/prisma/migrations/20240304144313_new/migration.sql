-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "property_id" TEXT;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("property_id") ON DELETE SET NULL ON UPDATE CASCADE;
