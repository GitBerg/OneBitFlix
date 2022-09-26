import { Response } from "express";
import { AutheticatedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/FavoriteService";

export const favoritesController = {
    save: async (req: AutheticatedRequest, res: Response) =>{
        const userId = req.user!.id
        const {courseId} = req.body

        try {
            const favorite = await favoriteService.create(userId, Number(courseId))
            return res.status(201).json(favorite)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}