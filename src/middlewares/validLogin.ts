import { EnumErrorCodes } from 'common/enums';
import { NextFunction, Request, Response } from 'express';

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.session.loggedIn) next();
  else
    res.status(401).json({
      error: `-${EnumErrorCodes.UnauthRoute}`,
      message: 'You do not have authorization.',
    });
};
