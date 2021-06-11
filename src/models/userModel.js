import mongoose from "mongoose";

mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        maxlength: 200,
    },
    username: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
        maxlength: 200,
        minlength: 6
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 5
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 5
    },
    gender: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        maxlength: 10,
    },
    birthday: {
        type: Date,
    },
    // avatar: {
    //     type: String,
    // },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updated_at: {
        type: Date,
    },
    isdeleted: {
        type: Number,
        default: 0,
    },
})

export default mongoose.model("User", userSchema)