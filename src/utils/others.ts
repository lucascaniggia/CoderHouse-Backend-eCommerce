import { Request } from 'express';

// @parameter -> string/number/array/object
// Returns if item (passed as parameter) is empty

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

// @parameter req -> Request Object
// Returns error if user is unauthorized

export const permissionError = (req: Request): Error => {
  throw {
    error: '-1',
    description: `Unauthorized route. Route ${req.originalUrl} method ${req.method}`,
    message: 'User has no permission to perform this action.'
  };
};