import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {Request, Response, NextFunction} from 'express';
import  xss from 'xss';

export function validateDto(dtoClass: any)  { //<T extends object>(dtoClass: new () => T)
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const output = plainToClass(dtoClass, req.body);
      const errors: ValidationError[] = await validate(output);

      if(errors.length > 0) {
        const formattedErrors = errors.map(error => {
          return {
            field: error.property,
            validations: error.constraints
          }
        });
  
        res.status(400).json({
          errors: formattedErrors
        });
        return;
      } 

      req.body = output;
      next();
    }
    catch(errors) {
      console.log("Validation Middleware: "+errors);
      res.status(500).json({
        message: 'Internal Server Error'
      });
      return;
    }
  }
}

export function sanitizeRequest(req: Request, res: Response, next: NextFunction): void {
  for (let key in req.body) {
    if(typeof req.body[key] === 'string') {
      req.body[key] = xss(req.body[key]);
    }
  }
  next();
}