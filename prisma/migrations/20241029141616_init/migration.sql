/*
  Warnings:

  - You are about to drop the column `winnerOne` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `winnerThere` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `winnerTwo` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "winnerOne",
DROP COLUMN "winnerThere",
DROP COLUMN "winnerTwo";
