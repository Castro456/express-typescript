import {Request, Response, NextFunction} from "express";
import * as userServices from "../services/users.service"

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // The function getUsersList is asynchronous, meaning it performs operations that take time (like fetching data from a database). In JavaScript, asynchronous functions return a Promise, which represents the eventual completion (or failure) of that operation.
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