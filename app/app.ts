import express from 'express';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import morgan from 'morgan';
import { loginRoute } from "./routes/auth";
import { usersRoute } from "./routes/users";
import { errorHandler } from "./middlewares/errorHandler";
import "reflect-metadata";

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/login", loginRoute)
app.use("/users", usersRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error('Page not found');
  error.name = 'not_found';
  res.status(404);
  next(error);
})

app.use(errorHandler)