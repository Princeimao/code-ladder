/*
  Warnings:

  - You are about to drop the column `code` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `stdin` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `stdout` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `questionId` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `language` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('PYTHON', 'JAVASCRIPT', 'C', 'CPP', 'JAVA');

-- AlterTable
ALTER TABLE "Submission" DROP COLUMN "code",
DROP COLUMN "stdin",
DROP COLUMN "stdout",
ADD COLUMN     "questionId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL;
