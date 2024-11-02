-- CreateTable
CREATE TABLE "Winner" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "winningLevel" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Winner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Winner_ticketId_key" ON "Winner"("ticketId");

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winner" ADD CONSTRAINT "Winner_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
