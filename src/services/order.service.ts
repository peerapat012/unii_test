import { prisma } from "../prisma"
import { Grade, Prisma } from "../prisma/browser";
import { SummaryQuery } from "../types/summaryQuery"

export async function getSummary(query: SummaryQuery) {

    const {
        startDate,
        endDate,
        categoryId,
        subCategoryId,
        orderId,
        orderIdMatch = "contains",
        minPrice,
        maxPrice,
        grade,
        page = 1,
        limit = 20
    } = query

    const where: Prisma.OrderWhereInput = {
        ...(orderId && {
            orderId: orderIdMatch === "exact"
                ? { equals: orderId }
                : { contains: orderId },
        }),

        ...(startDate || endDate) && {
            orderFinishedDate: {
                ...(startDate && { gte: new Date(startDate) }),
                ...(endDate && { lte: new Date(endDate) }),
            },
        },

        ...((categoryId || subCategoryId) && {
            productItems: {
                some: {
                    product: {
                        ...(categoryId && { category: { categoryId } }),
                        ...(subCategoryId && { subCategory: { subCategoryId } }),
                    },
                },
            },
        }),

        ...((minPrice || maxPrice) && {
            productItems: {
                some: {
                    price: {
                        ...(minPrice && { gte: Number(minPrice) }),
                        ...(maxPrice && { lte: Number(maxPrice) }),
                    },
                },
            },
        }),
    };

    const [data, total, summary] = await prisma.$transaction([
        prisma.order.findMany({
            where: where,
            select: {
                orderId: true,
                product: {
                    select: {
                        categoryId: true,
                        productItems: {
                            where: {
                                ...(grade && { grade: grade as Grade }),
                            },
                            select: {
                                grade: true,
                                price: true,
                                quantity: true,
                                total: true,
                            }
                        },
                        subCategoryId: true
                    }
                },
                orderFinishedDate: true,
                orderFinishedTime: true,
            },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.order.count({ where }),
        prisma.productItem.aggregate({
            where: {
                order: where,
                ...(grade && { grade: grade as Grade }),
                ...((categoryId || subCategoryId)) && {
                    product: {
                        ...(categoryId && { category: { categoryId } }),
                        ...(subCategoryId && { subCategory: { subCategoryId } }),
                    },
                }
            },
            _sum: { total: true, quantity: true },
        })
    ]);



    const totalPage = Math.ceil(total / limit)

    return {
        page,
        totalPage,
        limit,
        summary: {
            totalPrice: summary._sum.total ?? 0,
            totalQuantity: summary._sum.quantity ?? 0
        },
        data
    }
}