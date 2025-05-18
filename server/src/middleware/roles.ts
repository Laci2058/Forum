import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Forbidden: Admins only.');
  }
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user && user.role === 'user') {
    next();
  } else {
    res.status(403).send('Forbidden: Users only.');
  }
};
