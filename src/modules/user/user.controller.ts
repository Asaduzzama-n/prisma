import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const insertIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const insertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await userService.insertOrUpdateProfile(req.body);
    res.send({
      success: true,
      message: "Profile created or updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();
    res.send({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(parseInt(req.params.id));
    res.send({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const userController = {
  insertIntoDB,
  insertOrUpdateProfile,
  getAllUser,
  getSingleUser,
};
