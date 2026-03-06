import { prisma } from "../prisma"

export async function getCategory(categoryId?: string) {
    return prisma.category.findMany({
        where: categoryId
            ? {
                categoryId: categoryId,
            }
            : undefined,
        select: {
            categoryId: true,
            name: true,
            subCategories: {
                select: {
                    subCategoryId: true,
                    name: true
                }
            }
        }
    });
}