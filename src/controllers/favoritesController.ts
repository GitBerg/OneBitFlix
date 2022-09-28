import { Response } from "express";
import { AutheticatedRequest } from "../middlewares/auth";
import { favoriteService } from "../services/FavoriteService";

export const favoritesController = {

    index: async (req: AutheticatedRequest, res: Response) => {
        const userId = req.user!.id

        try {
            const favorites = await favoriteService.findByUserId(userId)
            return res.json(favorites)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

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
    },

    delete: async(req: AutheticatedRequest, res:Response) => {
        const userId = req.user!.id
        const courseId = req.params.id

        try {
            await favoriteService.delete(userId, Number(courseId))
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}