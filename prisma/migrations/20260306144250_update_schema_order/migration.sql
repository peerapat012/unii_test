-- DropForeignKey
ALTER TABLE "ProductItem" DROP CONSTRAINT "ProductItem_orderId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "orderId" TEXT;

-- CreateIndex
CREATE INDEX "Product_orderId_idx" ON "Product"("orderId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
