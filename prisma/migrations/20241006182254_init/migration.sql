/*
  Warnings:

  - The primary key for the `TelegramUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ipAddress` on the `TelegramUser` table. All the data in the column will be lost.
  - You are about to drop the column `moodleUserId` on the `TelegramUser` table. All the data in the column will be lost.
  - You are about to drop the `MoodleUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[UserId]` on the table `TelegramUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TelegramUser" DROP CONSTRAINT "TelegramUser_moodleUserId_fkey";

-- DropIndex
DROP INDEX "TelegramUser_moodleUserId_key";

-- AlterTable
ALTER TABLE "TelegramUser" DROP CONSTRAINT "TelegramUser_pkey",
DROP COLUMN "ipAddress",
DROP COLUMN "moodleUserId",
ADD COLUMN     "UserId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "TelegramUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TelegramUser_id_seq";

-- DropTable
DROP TABLE "MoodleUser";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser_UserId_key" ON "TelegramUser"("UserId");

-- AddForeignKey
ALTER TABLE "TelegramUser" ADD CONSTRAINT "TelegramUser_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
