import {Request, Response, NextFunction} from "express";
import { UserResponse } from "../dto/users.dto"
import { AppDataSource } from "../data-source";
import { Users } from "../entities/Users.entity"

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  // const userPayload = new UserResponse(
  //   "Castro",
  //   "Zac",
  //   "Hide",
  //   "castro@gmail.com",
  //   "986758475",
  //   new Date
  // );

  try {
    const usersRepository = AppDataSource.getRepository(Users);
    const usersList = await usersRepository.find();
    
    // const userPayload: UserResponse = {
    //   fname: 'Castro',
    //   lname: 'Zac',
    //   uname: 'hide',
    //   email: 'castro@gmail.com',
    //   phone: '9567446587',
    //   lastLogin: '21-02-25'
    // };
  
    // res.status(200).json(userPayload);
    res.json(usersList.map(user => Object.assign({}, user)));
  }
  catch(Error) {
    console.log(Error);
  }
}