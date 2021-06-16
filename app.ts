const express = require('express');
// import express = require('express');

import * as mongoose from 'mongoose';
import router from './src/routes/index'
import * as dotenv from 'dotenv';
import errorHandler from './src/middlewares/errorHandler';
import connectToDb from "./src/db/index";

dotenv.config();
const app = express();
const port = process.env.PORT;

connectToDb();
app.use(express.urlencoded({
    extended: true
}));
app.use('/api', router);// '/api/' is also ok 
app.listen(port, function () {
    console.log('Listening on 3000')
})
app.use(errorHandler);

export default app;
