import {Request, Response, NextFunction} from "express";
import * as userServices from "../services/users.service"

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const usersList = await userServices.getUsersList();
    res.json(usersList);
  }
  catch(Error) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
}