import jwt from 'jsonwebtoken'
import { userService } from '../services/index.js';

export default async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw { status: 401, message: 'No token provided' };
        }

        // Check logout: way2 - by destroy session
        if (!req.session || !req.session.userId) {
            // var err = new Error('You must be logged in.');
            // err.status = 401;
            // return next(err);
            throw {
                message: "Please login!",
                status: 400
            }
        }
        const token = req.headers.authorization.split(' ')[1];//[0] = "Bearer"
        const verified = jwt.verify(token, process.env.TOKEN_SECRET, { algorithms: ['HS256'] });

        //Check logout: way1 - by store expiration time
        // Check expirationDate field to check if user logged out or not
        // const isValidAccount = await userService.checkExpTime(verified.id)
        // if (isValidAccount) {
        //     req.user = verified;
        //     next();
        // } else {
        // throw {
        //     message: "Please login!",
        //     status: 401
        // }
        // }
        req.user = verified;
        next();
    } catch (err) {
        next(err);
    }
};
