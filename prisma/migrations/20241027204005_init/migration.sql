/*
  Warnings:

  - You are about to drop the column `numbers` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `number` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "numbers",
ADD COLUMN     "number" INTEGER NOT NULL;
