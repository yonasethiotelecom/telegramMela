/*
  Warnings:

  - Added the required column `accountNumber` to the `WatingBalance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `WatingBalance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatingBalance" ADD COLUMN     "accountNumber" TEXT NOT NULL,
ADD COLUMN     "bankName" TEXT NOT NULL;
