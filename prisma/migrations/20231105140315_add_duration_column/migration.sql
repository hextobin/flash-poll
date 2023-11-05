/*
  Warnings:

  - Added the required column `duration` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "duration" INTEGER NOT NULL;
