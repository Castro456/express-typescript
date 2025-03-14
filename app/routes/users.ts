import {Router} from "express";
import * as usersController from '../controllers/usersController'
import {validateRequest, sanitizeRequest} from '../middlewares/validateDTO'
import {UserRegister} from '../DTOs/users.dto'

export const usersRoute = Router();

usersRoute.post("/register", sanitizeRequest, validateRequest(UserRegister), usersController.registerUser)
usersRoute.get("/", usersController.getUsers);