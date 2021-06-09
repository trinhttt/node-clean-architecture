import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.DB_URL
// mongoose.Promise = global.Promise;

// // use with local
// const connectToDb = async () => {
//     return mongoose.connect(host, { useNewUrlParser: true });
// };
const connectToDb = () => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Error connecting to database: " + error.message);
    });
}

export default connectToDb;
