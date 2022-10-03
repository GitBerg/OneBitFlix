import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AutheticatedRequest } from "../middlewares/auth";
import { courseService } from "../services/CourseService";
import { favoriteService } from "../services/FavoriteService";
import { likeService } from "../services/LikeService";

export const coursesController = {

    featured: async (req: Request, res: Response) => {
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses();
            return res.json(featuredCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    newest: async (req: Request, res: Response) => {
        try {
            const newestCourses = await courseService.getTopTenNewest();
            return res.json(newestCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    search: async (req: Request, res: Response) => {

        const { name } = req.query
        const [page, perPage] = getPaginationParams(req.query)

        try {
            if (typeof name !== 'string') throw new Error('name param must be of type string')
            const courses = await courseService.findByName(name, page, perPage);
            return res.json(courses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    show: async (req: AutheticatedRequest, res: Response) => {
        const userId = req.user!.id
        const courseId = req.params.id

        try {
            const course = await courseService.findByIdWithEpisodes(courseId)

            if (!course) return res.status(404).json({ message: "Course not find!" })
        
            const liked = await likeService.isLiked(userId, Number(courseId))
            const favorited = await favoriteService.isFavorited(userId, Number(courseId))
            return res.json({ ...course.get(), liked, favorited })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}