/*
  Warnings:

  - A unique constraint covering the columns `[pollLinkID]` on the table `Poll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Poll_pollLinkID_key" ON "Poll"("pollLinkID");
