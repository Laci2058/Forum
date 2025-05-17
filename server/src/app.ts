import express from 'express';
import expressSession  from 'express-session';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config';
import { configurePassport } from './passport/passport';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { configureRoutes } from './routes/routes';

const app = express();
const PORT = config.port;
const mongoUri = config.mongoUri;


app.use(express.json());

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('DB connection error:', err));

const whitelist = ['http://localhost:4200','http://localhost:8100']
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allowedOrigin?: string) => void) => {
    if (origin && whitelist.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS.'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

// bodyParser
app.use(bodyParser.urlencoded({extended: true}));

// cookieParser
app.use(cookieParser());

// session
const sessionOptions: expressSession.SessionOptions = {
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
};
app.use(expressSession(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

configurePassport(passport);

app.use('/app', configureRoutes(passport, express.Router()));

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT.toString());
});

console.log('After server is ready.');
