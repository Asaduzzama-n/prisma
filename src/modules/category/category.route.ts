import express from "express";
import { categoryController } from "./category.controller";
const router = express.Router();

router.post("/create-category", categoryController.insertIntoDB);

export const categoryRoutes = router;
