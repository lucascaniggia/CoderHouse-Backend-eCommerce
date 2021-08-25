import { Request, Response, NextFunction } from 'express';

const admin = true;

export const isAdmin = (req: Request, res: Response, next: NextFunction):void => {
  if (admin) {
    next();
  } else {
    res.status(401).send({
      error: '-1',
      description: `Unauthorized error on route ${req.originalUrl} method ${req.method}`,
      message: 'User has no permissions to perform this action.'
    });
  }
};
