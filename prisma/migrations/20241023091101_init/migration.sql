-- CreateTable
CREATE TABLE "WatingBalance" (
    "id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "avelible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "telegramUserId" TEXT NOT NULL,

    CONSTRAINT "WatingBalance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WatingBalance_telegramUserId_key" ON "WatingBalance"("telegramUserId");

-- AddForeignKey
ALTER TABLE "WatingBalance" ADD CONSTRAINT "WatingBalance_telegramUserId_fkey" FOREIGN KEY ("telegramUserId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
