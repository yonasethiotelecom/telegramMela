-- CreateTable
CREATE TABLE "_ProfileToTelegramUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToTelegramUser_AB_unique" ON "_ProfileToTelegramUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToTelegramUser_B_index" ON "_ProfileToTelegramUser"("B");

-- AddForeignKey
ALTER TABLE "_ProfileToTelegramUser" ADD CONSTRAINT "_ProfileToTelegramUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToTelegramUser" ADD CONSTRAINT "_ProfileToTelegramUser_B_fkey" FOREIGN KEY ("B") REFERENCES "TelegramUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
