import jwt from 'jsonwebtoken'
import {userService} from '../services/index';

export default async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw {status: 401, message: 'No token provided'};
        }
        const token = req.headers.authorization.split(' ')[1];//[0] = "Bearer"
        const verified = jwt.verify(token, process.env.TOKEN_SECRET, {algorithms: ['HS256']});
        // Check expirationDate field to check if user logged out or not
        const isValidAccount = await userService.checkExpTime(verified.id)
        if (isValidAccount) {
            req.user = verified;
            next();
        } else {
            throw {
                message: "Please login!",
                status: 400
            }
        }
    } catch (err) {
        next(err);
    }
};
  