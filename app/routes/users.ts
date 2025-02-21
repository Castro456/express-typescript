import {Router} from "express";
import * as usersController from '../controllers/usersController'

export const usersRoute = Router();

usersRoute.get("/", usersController.getUsers);