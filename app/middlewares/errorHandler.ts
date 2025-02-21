import { Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response) => {
  const statusCode: number = res.statusCode || 500;
  const message: string = err.message || "There was an error, Please try again";
  const status: string = err.name || 'failed';

  res.status(statusCode).json({
    status,
    statusCode,
    message,
    ...[process.env.NODE_ENV == 'development' && {error: err.stack}]
  })
}