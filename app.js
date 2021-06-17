import express from 'express';
import mongoose from 'mongoose';
import router from './src/routes/index.js'
import dotenv from 'dotenv';
import errorHandler from './src/middlewares/errorHandler.js';
import connectToDb from "./src/db/index.js";
import session from 'express-session'
import config from './src/config/index.js'
dotenv.config();
const app = express();
const port = process.env.PORT;

connectToDb();
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    // store: new RedisStore({ client: redisClient }),
    secret: config.secret,
    resave: true,
    saveUninitialized: false//Save uninitialized sessions to the store
  }));
app.use('/api', router);// '/api/' is also ok 
app.listen(port, function () {
    console.log('Listening on 3000')
})
app.use(errorHandler);
