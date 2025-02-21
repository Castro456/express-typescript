import express from 'express';
import {loginAuthentication} from '../controllers/authController'

export const loginRoute = express.Router();

loginRoute.post('/', loginAuthentication);
