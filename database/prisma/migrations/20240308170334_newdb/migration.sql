-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "authorization_url" DROP NOT NULL,
ALTER COLUMN "access_code" DROP NOT NULL;
