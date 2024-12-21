/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `creator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `public_id` to the `creator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "creator" ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "creator_name_key" ON "creator"("name");
