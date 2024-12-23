/*
  Warnings:

  - You are about to alter the column `firstname` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(20)`.
  - You are about to alter the column `lastname` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(20)`.
  - You are about to alter the column `nickname` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(20)`.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nickname]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Hide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hide" DROP CONSTRAINT "Hide_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_post_id_fkey";

-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_post_id_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_user_id_fkey";

-- AlterTable
ALTER TABLE "Hide" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "firstname" SET DATA TYPE CHAR(20),
ALTER COLUMN "lastname" SET DATA TYPE CHAR(20),
ALTER COLUMN "nickname" SET DATA TYPE CHAR(20),
ALTER COLUMN "photo" DROP NOT NULL;

-- DropTable
DROP TABLE "post";

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" CHAR(40) NOT NULL,
    "description" CHAR(80) NOT NULL,
    "pre_video" TEXT NOT NULL,
    "pre_image" TEXT NOT NULL,
    "url_image" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_id_key" ON "posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hide" ADD CONSTRAINT "Hide_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
