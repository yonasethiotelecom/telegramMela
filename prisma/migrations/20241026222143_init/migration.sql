/*
  Warnings:

  - You are about to drop the column `imageUpload` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `imageNum` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "imageUpload",
ADD COLUMN     "imageNum" INTEGER NOT NULL;
