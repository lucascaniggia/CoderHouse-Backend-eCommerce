import { Request, Response, NextFunction } from 'express';
import { EnumErrorCodes } from '../common/enums';

const admin = false;

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (admin) {
    next();
  } else {
    res.status(401).send({
      error: `-${EnumErrorCodes.UnauthRoute}`,
      description: `Unauthorized error on route ${req.originalUrl} method ${req.method}`,
      message: 'User has no permissions to perform this action.',
    });
  }
};
