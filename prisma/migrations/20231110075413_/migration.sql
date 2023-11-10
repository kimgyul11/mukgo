/*
  Warnings:

  - Added the required column `place_name` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "place_name" TEXT NOT NULL;
