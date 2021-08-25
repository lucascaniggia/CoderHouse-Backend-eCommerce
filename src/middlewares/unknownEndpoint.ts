import { Request, Response } from 'express';

export const unknownEndpoint = (req: Request, res: Response): void => {
  res.status(404).send({
    error: '-2',
    description: `Route ${req.originalUrl} with method ${req.method} could not be executed`
  });
};