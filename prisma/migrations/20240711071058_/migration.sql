/*
  Warnings:

  - Added the required column `costosAnualesIndirectos` to the `Parametro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parametro" ADD COLUMN     "costosAnualesIndirectos" DOUBLE PRECISION NOT NULL;
