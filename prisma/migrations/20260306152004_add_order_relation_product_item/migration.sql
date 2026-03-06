-- AddForeignKey
ALTER TABLE "ProductItem" ADD CONSTRAINT "ProductItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
