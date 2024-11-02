-- CreateTable
CREATE TABLE "TelegramUser" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "username" TEXT,
    "moodleUserId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TelegramUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoodleUser" (
    "id" SERIAL NOT NULL,
    "moodleId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoodleUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser_chatId_key" ON "TelegramUser"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser_moodleUserId_key" ON "TelegramUser"("moodleUserId");

-- CreateIndex
CREATE UNIQUE INDEX "MoodleUser_moodleId_key" ON "MoodleUser"("moodleId");

-- CreateIndex
CREATE UNIQUE INDEX "MoodleUser_phone_key" ON "MoodleUser"("phone");

-- AddForeignKey
ALTER TABLE "TelegramUser" ADD CONSTRAINT "TelegramUser_moodleUserId_fkey" FOREIGN KEY ("moodleUserId") REFERENCES "MoodleUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
