import { Request, Response } from "express"
import { getCategory } from "../services/category.service"

export async function categoryController(req: Request, res: Response) {

    const result = await getCategory(req.query.categoryId as string)

    res.json(result)
}