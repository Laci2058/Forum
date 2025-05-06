import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error('Missing MONGODB_URI in .env file');
}

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'defaultSecret',
};
