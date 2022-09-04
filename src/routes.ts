import { categoriesController } from './controllers/categoriesController';
import express from "express";

const router = express.Router()

router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

export { router }