import axios from "axios";
import { prisma } from "../prisma";

const TRANSACTION_API =
    "https://apirecycle.unii.co.th/Stock/query-transaction-demo";

export async function syncOrders() {
    try {
        const response = await axios.get(TRANSACTION_API);

        const transactions = response.data.buyTransaction;

        for (const transaction of transactions) {
            const order = await prisma.order.upsert({
                where: { orderId: transaction.orderId },
                update: {
                    orderFinishedDate: new Date(transaction.orderFinishedDate),
                    orderFinishedTime: transaction.orderFinishedTime,
                },
                create: {
                    orderId: transaction.orderId,
                    orderFinishedDate: new Date(transaction.orderFinishedDate),
                    orderFinishedTime: transaction.orderFinishedTime,
                },
            });

            for (const product of transaction.requestList) {
                const category = await prisma.category.findUnique({
                    where: { categoryId: product.categoryID },
                });
                const subCategory = await prisma.subCategory.findUnique({
                    where: { subCategoryId: product.subCategoryID },
                });

                if (!category || !subCategory) {
                    console.warn(`Skipping item: category=${product.categoryID}, subCategory=${product.subCategoryID} not found`);
                    continue;
                }

                var prod = await prisma.product.create({
                    data: {
                        orderId: order.id,
                        categoryFK: category.id,
                        categoryId: category.categoryId,
                        subCategoryFK: subCategory.id,
                        subCategoryId: subCategory.subCategoryId,
                    }
                })

                for (const item of product.requestList) {
                    await prisma.productItem.create({
                        data: {
                            orderId: order.id,
                            productId: prod.id,
                            grade: item.grade,
                            price: item.price,
                            quantity: Number(item.quantity),
                            total: item.total
                        }
                    })
                }

            }
        }

        console.log("Order sync completed");
    } catch (error) {
        console.error("Error syncing orders:", error);
    }
}
