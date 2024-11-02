/*
  Warnings:

  - You are about to drop the `_ProfileToTelegramUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProfileToTelegramUser" DROP CONSTRAINT "_ProfileToTelegramUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileToTelegramUser" DROP CONSTRAINT "_ProfileToTelegramUser_B_fkey";

-- DropTable
DROP TABLE "_ProfileToTelegramUser";

-- CreateTable
CREATE TABLE "TelegramUserProfile" (
    "id" TEXT NOT NULL,
    "telegramUserId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "TelegramUserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUserProfile_telegramUserId_profileId_key" ON "TelegramUserProfile"("telegramUserId", "profileId");

-- AddForeignKey
ALTER TABLE "TelegramUserProfile" ADD CONSTRAINT "TelegramUserProfile_telegramUserId_fkey" FOREIGN KEY ("telegramUserId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramUserProfile" ADD CONSTRAINT "TelegramUserProfile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
