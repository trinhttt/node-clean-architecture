import mongoose from 'mongoose';
// no need import 'dotenv' because it's imported from the parent (app.js calls it)
const url = process.env.DB_URL

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
