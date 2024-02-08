import express from "express";
import { postController } from "./post.controller";
const router = express.Router();

router.get("/aggregation-group", postController.aggregationAndGroup);
router.get("/:id", postController.getSinglePost);
router.patch("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.post("/", postController.createPost);
router.get("/", postController.getAllPost);

export const postRoutes = router;
