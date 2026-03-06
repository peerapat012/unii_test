import { Request, Response } from "express"
import { getSummary as getOrder } from "../services/order.service"

export async function orderController(req: Request, res: Response) {

    const result = await getOrder({
        startDate: req.query.startDate as string,
        endDate: req.query.endDate as string,
        categoryId: req.query.categoryId as string,
        subCategoryId: req.query.subCategoryId as string,
        orderId: req.query.orderId as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        grade: req.query.grade as any,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 20
    })

    res.json(result)
}