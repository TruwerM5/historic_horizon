/*
  Warnings:

  - The `tags` column on the `articles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "articles_author_id_key";

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
