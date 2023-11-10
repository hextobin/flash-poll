/*
  Warnings:

  - Added the required column `pollLinkID` to the `Poll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Poll" ADD COLUMN     "pollLinkID" TEXT NOT NULL;
