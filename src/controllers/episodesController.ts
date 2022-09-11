import { Request, Response } from "express";
import { episodeService } from "../services/EpisodeService";

export const episodesController = {
    stream: async(req: Request, res: Response) => {
        const {videoUrl} = req.query
    
        const range = req.headers.range

        episodeService.streamEpisodeToResponse(res, videoUrl, range)

        try {
            if (typeof videoUrl !== 'string') throw new Error('videoUrl param must be of type string')
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}