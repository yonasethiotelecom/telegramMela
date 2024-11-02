/*
  Warnings:

  - A unique constraint covering the columns `[telegramUserId]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Balance_telegramUserId_key" ON "Balance"("telegramUserId");
