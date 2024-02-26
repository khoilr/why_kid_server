-- CreateTable
CREATE TABLE "Game" (
    "ID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "GameScore" (
    "ID" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "gameID" TEXT NOT NULL,
    "childID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameScore_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE INDEX "idx_childID" ON "GameScore"("childID");

-- CreateIndex
CREATE INDEX "idx_gameID" ON "GameScore"("gameID");

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScore" ADD CONSTRAINT "GameScore_childID_fkey" FOREIGN KEY ("childID") REFERENCES "Child"("ID") ON DELETE RESTRICT ON UPDATE CASCADE;
