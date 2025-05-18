import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user && user.role === 'admin') {
    return next();
  } else {
    return res.status(403).send('Forbidden: Admins only.');
  }
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;
  if (user && user.role === 'user') {
    return next();
  } else {
    return res.status(403).send('Forbidden: Users only.');
  }
};
