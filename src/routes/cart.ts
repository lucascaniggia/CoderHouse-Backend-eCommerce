import express, { Request, Response } from 'express';

const cartRoutes = express.Router();

cartRoutes.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'Testeando desde cart'
  });
});

export default cartRoutes;