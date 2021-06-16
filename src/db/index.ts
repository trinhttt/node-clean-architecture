import * as mongoose from 'mongoose';
// no need import 'dotenv' because it's imported from the parent (app.js calls it)
const url = process.env.DB_URL

const connectToDb = async () => {
    // try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.log("Error connecting to database: " + error.message);
        });
    // } catch (err) {
    //     console.log("Error connecting to database: " + err.message);
    //     process.exit(1);
    // }

}

export default connectToDb;
