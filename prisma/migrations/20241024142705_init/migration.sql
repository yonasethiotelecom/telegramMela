/*
  Warnings:

  - You are about to drop the column `UserId` on the `TelegramUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[TelegramUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TelegramUser" DROP CONSTRAINT "TelegramUser_UserId_fkey";

-- DropIndex
DROP INDEX "TelegramUser_UserId_key";

-- AlterTable
ALTER TABLE "TelegramUser" DROP COLUMN "UserId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "TelegramUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_TelegramUserId_key" ON "User"("TelegramUserId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_TelegramUserId_fkey" FOREIGN KEY ("TelegramUserId") REFERENCES "TelegramUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
