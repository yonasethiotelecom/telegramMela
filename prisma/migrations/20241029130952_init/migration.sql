/*
  Warnings:

  - You are about to drop the column `winningLevel` on the `Winner` table. All the data in the column will be lost.
  - Added the required column `level` to the `Winner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Winner" DROP COLUMN "winningLevel",
ADD COLUMN     "level" INTEGER NOT NULL;
