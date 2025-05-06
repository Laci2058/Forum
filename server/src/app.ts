import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { router as userRoutes } from './routes/user.routes';
import { config } from './config';

const app = express();
const PORT = config.port;
const mongoUri = config.mongoUri;


app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));
