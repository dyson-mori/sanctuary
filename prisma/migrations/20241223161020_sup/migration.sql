/*
  Warnings:

  - You are about to drop the column `url_image` on the `posts` table. All the data in the column will be lost.
  - Added the required column `url_video` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "url_image",
ADD COLUMN     "url_video" TEXT NOT NULL;
