import { Router } from 'express';
import User from '../models/user.model.js';

export const router = Router();

router.get('/asd', async (_req, res) => {  
  const users = await User.find();
  res.json({ message: 'Users endpoint working' });
});

router.post('/asd', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json(newUser);
});
