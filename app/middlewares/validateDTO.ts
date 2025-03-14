import {plainToClass} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';
import {Request, Response, NextFunction} from 'express';
import  xss from 'xss';

/**
 * @method
 * * Sanitize the incoming request using xss
 * 
 * @author Castro
 * 
 * @param req 
 * @param res 
 * @param next
 * 
 * @returns void 
 */
export const sanitizeRequest = (req: Request, res: Response, next: NextFunction): void => {
  for(let key in req.body) {
    if(typeof req.body[key] === 'string') {
      req.body[key] = xss(req.body[key]);
    }
  }
  next();
}


/**
 * @method
 * * Used to validate the incoming request from the route
 * 
 * @author Castro
 * 
 * @param dtoClass
 * 
 * @returns json | void
 */
export const validateRequest = (dtoClass: any) => {
  return async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const output: object = plainToClass(dtoClass, req.body);
      const errors: ValidationError[] = await validate(output);
  
      if(errors.length > 0) {
        const formattedErrors: object = errors.map(error => {
          return {
            field: error.property,
            validations: error.constraints
          }
        });
  
        res.status(401).json({
          errors: formattedErrors
        });
        return;
      }
  
      req.body = output;
      next();
    }
    catch(errors) {
      console.log("Validation Error: "+errors);
      res.status(500).json({
        errors: 'Internal Server Error'
      });
      return;
    }
  }
}