/*
  Warnings:

  - You are about to drop the column `gameID` on the `GameScore` table. All the data in the column will be lost.
  - Added the required column `completed` to the `GameScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelID` to the `GameScore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameScore" DROP CONSTRAINT "GameScore_gameID_fkey";

-- DropIndex
DROP INDEX "idx_gameID";

-- AlterTable
ALTER TABLE "GameScore" DROP COLUMN "gameID",
ADD COLUMN     "completed" BOOLEAN NOT NULL,
ADD COLUMN     "levelID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GameLevel" (
    "ID" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "gameID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameLevel_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "idx_gameID" ON "GameLevel"("gameID");

-- CreateIndex
CREATE INDEX "idx_levelID" ON "GameScore"("levelID");

-- AddForeignKey
ALTER TABLE "GameLevel" ADD CONSTRAINT "GameLevel_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "GameLevel"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
