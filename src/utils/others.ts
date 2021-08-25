import { Request } from 'express';

export const isEmpty = (item: string | number | unknown): boolean => {
  switch (typeof item) {
    case 'string':
      if (item !== '' && item !== 'null' && item !== 'undefined') {
        return false;
      }
      return true;
    case 'number':
      return false;
    case 'object':
      if (JSON.stringify(item) === '{}' || JSON.stringify(item) === '[]') {
        return true;
      }
      return false;
  }
  return true;
};

export const permissionError = (req: Request): Error => {
  throw {
    error: '-1',
    description: `Unauthorized route. Route ${req.originalUrl} method ${req.method}`,
    message: 'User has no permission to perform this action.'
  };
};