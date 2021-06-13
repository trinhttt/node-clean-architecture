import mongoose from 'mongoose';
const url = process.env.DB_URL//?? no need import 'dotenv'
// mongoose.Promise = global.Promise;//?? purpose?

// // use with local
// const connectToDb = async () => {
//     return mongoose.connect(host, { useNewUrlParser: true });
// };
const connectToDb = () => {
    console.log(url)
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log("Error connecting to database: " + error.message);
    });
}

export default connectToDb;
