/*
  Warnings:

  - You are about to drop the `Hide` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hide" DROP CONSTRAINT "Hide_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Hide" DROP CONSTRAINT "Hide_user_id_fkey";

-- DropTable
DROP TABLE "Hide";

-- CreateTable
CREATE TABLE "Private" (
    "id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Private_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Private_id_key" ON "Private"("id");

-- CreateIndex
CREATE INDEX "Private_post_id_user_id_idx" ON "Private"("post_id", "user_id");

-- AddForeignKey
ALTER TABLE "Private" ADD CONSTRAINT "Private_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Private" ADD CONSTRAINT "Private_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
