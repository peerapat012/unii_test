import axios from "axios";
import { prisma } from "../prisma";

const CATEGORY_API =
    "https://apirecycle.unii.co.th/category/query-product-demo";

export async function syncCategories() {
    try {
        const response = await axios.get(CATEGORY_API);
        const categories = response.data.productList || [];

        for (const category of categories) {
            if (!category.categoryId) {
                console.warn("Skipping category with missing categoryId");
                continue;
            }

            const cate = await prisma.category.upsert({
                where: { categoryId: String(category.categoryId) },
                update: {
                    name: category.categoryName,
                },
                create: {
                    categoryId: String(category.categoryId),
                    name: category.categoryName,
                }
            });

            if (category.subcategory && Array.isArray(category.subcategory)) {
                for (const sub of category.subcategory) {
                    if (!sub.subCategoryId) {
                        console.warn(`Skipping subcategory with missing subCategoryId in category ${category.categoryId}`);
                        continue;
                    }

                    await prisma.subCategory.upsert({
                        where: { subCategoryId: String(sub.subCategoryId) },
                        update: {
                            name: sub.subCategoryName,
                            categoryId: cate.id,
                        },
                        create: {
                            subCategoryId: String(sub.subCategoryId),
                            name: sub.subCategoryName,
                            categoryId: cate.id,
                        }
                    });
                }
            }
        }

        console.log("Category sync completed");
    } catch (error) {
        console.error("Error syncing categories:", error);
    }
}