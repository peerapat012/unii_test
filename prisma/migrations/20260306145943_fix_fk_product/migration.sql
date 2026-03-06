/*
  Warnings:

  - Added the required column `categoryFK` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subCategoryFK` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_subCategoryId_fkey";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- DropIndex
DROP INDEX "Product_subCategoryId_idx";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryFK" TEXT NOT NULL,
ADD COLUMN     "subCategoryFK" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Product_categoryFK_idx" ON "Product"("categoryFK");

-- CreateIndex
CREATE INDEX "Product_subCategoryFK_idx" ON "Product"("subCategoryFK");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryFK_fkey" FOREIGN KEY ("categoryFK") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryFK_fkey" FOREIGN KEY ("subCategoryFK") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
