import { Request, Response, NextFunction } from 'express';
import { UnauthorizedRoute } from 'errors';

const admin = true;

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (admin) {
    next();
  } else {
    throw new UnauthorizedRoute(
      401,
      'You do not have permission to perform this action.',
      `Route ${req.originalUrl} method ${req.method} unauthorized.`,
    );
  }
};
