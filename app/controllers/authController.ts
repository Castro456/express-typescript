import { Request, Response, NextFunction } from "express"

export const loginAuthentication = (request: Request, response: Response, next: NextFunction) => {
  try {
    throw new Error("This is a catch")
    response.json({
      message: 'This is TypeScript'
    })
  } catch (error: any) {
    if (error instanceof Error) {
      response.json({
        error: {
          message: error.message,
          // stack: error.stack,
        }
      })
    }
  }
}