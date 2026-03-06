export interface SummaryQuery {
    startDate?: string
    endDate?: string
    categoryId?: string
    subCategoryId?: string
    orderId?: string
    orderIdMatch?: "exact" | "contains"
    minPrice?: number
    maxPrice?: number
    grade?: "A" | "B" | "C" | "D"
    page?: number
    limit?: number
}