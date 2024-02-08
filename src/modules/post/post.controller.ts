import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);
    res.send({
      success: true,
      message: "Post created successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const result = await postService.getSinglePost(parseInt(req.params.id));
    res.send({
      success: true,
      message: "Post retrieved successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    console.log(req.query);
    const options = req.query;
    const result = await postService.getAllPost(options);
    res.send({
      success: true,
      message: "Posts retrieved successfully!",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    res.send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const result = await postService.updatePost(id, data);
    res.send({
      success: true,
      message: "Posts updated successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await postService.deletePost(id);
    res.send({
      success: true,
      message: "Posts deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const aggregationAndGroup = async (req: Request, res: Response) => {
  try {
    const result = await postService.aggregationAndGroup();
    res.send({
      success: true,
      message: "Result!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const postController = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  aggregationAndGroup,
};
