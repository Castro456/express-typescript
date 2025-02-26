import {Router} from "express";
import * as usersController from '../controllers/usersController'
import {validateDto, sanitizeRequest} from '../middlewares/validateDTO'
import {UserRegister} from '../DTOs/users.dto'

export const usersRoute = Router();

usersRoute.post("/register", sanitizeRequest, validateDto(UserRegister), usersController.registerUser)
usersRoute.get("/", usersController.getUsers);