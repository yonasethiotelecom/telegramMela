/*
  Warnings:

  - You are about to drop the column `userId` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `TelegramUserId` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TelegramUserId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_userId_fkey";

-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_userId_fkey";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "userId",
ADD COLUMN     "TelegramUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "userId",
ADD COLUMN     "TelegramUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_TelegramUserId_fkey" FOREIGN KEY ("TelegramUserId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_TelegramUserId_fkey" FOREIGN KEY ("TelegramUserId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
