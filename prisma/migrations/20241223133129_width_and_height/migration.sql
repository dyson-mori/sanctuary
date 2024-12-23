/*
  Warnings:

  - Added the required column `height` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "width" TEXT NOT NULL;
