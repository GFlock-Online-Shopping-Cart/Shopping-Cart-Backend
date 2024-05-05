import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HTTPException } from '../../config/httpException';

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const ValidationMiddleware = (type: any, skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(type, req.body);
    validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted })
      .then(() => {
        req.body = dto;
        next();
      })
      .catch((errors: ValidationError[]) => {
        const message = extractConstraints(errors);
        next(new HTTPException(JSON.stringify(message), 400));
      });
  };
};

export function extractConstraints(json: any): string[] {
  const constraints: string[] = [];

  function traverse(obj: any) {
    if (Array.isArray(obj)) {
      obj.forEach(item => traverse(item));
    } else if (typeof obj === 'object') {
      for (const key in obj) {
        if (key === 'constraints') {
          constraints.push(obj[key]);
        } else {
          traverse(obj[key]);
        }
      }
    }
  }

  traverse(json);
  return constraints;
}