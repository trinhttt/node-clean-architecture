import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/index.js';
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
        match: [/^[a-zA-Z0-9_-]+$/, 'is invalid'],//regex
        // index: true//??
    },
    password: {
        type: String,
        required: true,
        // maxlength: 200,
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
    quotes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Quote',//name of model
        }
    ]
}, {
    //creates a createdAt and updatedAt field on our models that contain timestamps which will get automatically updated when our model changes
    timestamps: true,//?? 
})
userSchema.methods.setPassword = function (password) {
    console.log("setPassword");
    this.password = bcrypt.hashSync(password, 10);
};

userSchema.methods.validPassword = async function (password) {
    console.log("validPassword");
    //(textPassword, hash)
    const isCorrectPass = await bcrypt.compare(password, this.password)
    console.log(isCorrectPass);

    if (!isCorrectPass) {
        throw {
            message: 'Username and password do not match!',
            status: 400
        };
    }
};
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        {
            id: this._id,
            username: this.username,
        },
            // ACCESS_TOKEN_SECRET//?? store in env and any string?
            config.secret || "trinh_zz_qtqd"
        ,
        { expiresIn: '86400s' }
    );
};

userSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
    };
};

userSchema
    .pre('find', function () {
        this.populate({
            path: 'fullHDQuotes',
            select: 'name quote',//?? auto add owner field
        });
    });

userSchema
    .virtual('fullname')
    .get(function () {
        return this.firstname + this.lastname;
    });

// virtual: is a far more sophisticated approach to fetching referenced Child documents, 
// and it importantly, takes up less memory for data storage, 
// as the new key-field Mongoose virtual creates whenever a query is run, 
// doesn’t persist on the Parent document
userSchema
    .virtual('fullHDQuotes', {
        ref: 'Quote', //The Local Model to use
        localField: '_id', //Find in Model, where localField 
        foreignField: 'owner', // is equal to foreignField
        // use: count: true // And only get the number of docs
    });

// virtuals are not included in toJSON() and toObject() output by default
// So `res.json()` and other `JSON.stringify()` functions include virtuals
userSchema.set('toObject', { virtuals: true });

// So `toObject()` output includes virtuals
userSchema.set('toJSON', { virtuals: true });
export default mongoose.model("User", userSchema)