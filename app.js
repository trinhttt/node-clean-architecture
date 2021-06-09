import express from 'express';
import mongoose from 'mongoose';
import router from './src/routes/index.js'
import dotenv from 'dotenv';
import errorHandler from './src/middlewares/errorHandler.js';
import connectToDb from "./src/config/db.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

connectToDb();
app.use(express.urlencoded({
    extended: true
}));
app.use('/api/', router);
app.listen(port, function () {
    console.log('Listening on 3000')
})
app.use(errorHandler);
