/*
  Warnings:

  - Added the required column `payment_type` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('bank_transfer', 'online');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "payment_type" "PaymentType" NOT NULL;
