/*
  Warnings:

  - You are about to drop the column `TelegramUserId` on the `Balance` table. All the data in the column will be lost.
  - Added the required column `telegramUserId` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_TelegramUserId_fkey";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "TelegramUserId",
ADD COLUMN     "telegramUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_telegramUserId_fkey" FOREIGN KEY ("telegramUserId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
