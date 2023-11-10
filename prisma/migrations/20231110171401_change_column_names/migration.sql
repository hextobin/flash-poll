/*
  Warnings:

  - You are about to drop the column `text` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Poll` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Option` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "text",
ADD COLUMN     "answer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "title",
ADD COLUMN     "question" TEXT NOT NULL;
