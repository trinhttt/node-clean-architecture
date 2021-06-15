import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/index.js';
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    facebookId: {
        type: String
    },
    email: {
        type: String,
        required: true,
        maxlength: 200,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    username: {
        type: String,
        // required: true,
        maxlength: 100,
        minlength: 5,
        match: [/^[a-zA-Z0-9_-]+$/, 'is invalid'],//regex
        // index: true//??
        // unique: true//
    },
    password: {
        type: String,
        // required: true,
    },
    firstname: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 1
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 1
    },
    gender: {
        type: String,
        // required: true,
        enum: {
            values: ['0', '1'],//?? Number not work 
            message: '{VALUE} is not supported'//Custom Error Messages
        }
    },
    phone: {
        type: String,
        // required: true,
        maxlength: 10,
        match: [/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, 'is invalid'],
    },
    birthday: {
        type: Date,
        validate: {
            validator: function (value) {
                console.log(value);
                const currentTime = new Date();
                return value.getTime() <= currentTime.getTime();
            },
            message: 'Are you a demon?'
        }
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
    expirationDate: {
        type: Date,
        required: true,
        default: new Date(),
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
            email: this.email,
        },
            // ACCESS_TOKEN_SECRET//?? store in env and any string?
            config.secret || "trinh_zz_qtqd"
        ,
        {expiresIn: `${config.expTime}s`}
    );
};

userSchema.methods.toAuthJSON = function () {
    return {
        name: this.firstname + " " + this.lastname,
        email: this.email,
        id: this._id,
        token: this.generateJWT(),
        expirationDate: this.expirationDate
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