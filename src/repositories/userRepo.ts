// import {User, IUser} from '../models/userModel';
import axios from 'axios';
import { Document, Model, model , Schema} from "mongoose";

var User = model('User'); 

export const userRepo = {
    async createUser(reqBody) {
        const newUser: any = await User.create({
            email: reqBody.email,
            username: reqBody.username,
            firstname: reqBody.firstname,
            lastname: reqBody.lastname,
            gender: reqBody.gender,
            phone: reqBody.phone,
            quotes: reqBody.quotes,
            birthday: reqBody.birthday,
        })
        if (reqBody.facebookId) {
            newUser.facebookId = reqBody.facebookId;
        } else {
            newUser.setPassword(reqBody.password);
        }

        return await newUser.save();
        // return new Promise((resolve, reject) => {
        //     newUser
        //         .save()
        //         .then(newUserObj => resolve(newUserObj))
        //         .catch(error => reject(error));
        // });
    },

    async getAllUsers() {
        return await User.find();
    },
    async getSingleUser(id) {
        return await User.findById(id);
    },
    async getFBUser(facebookId) {
        return await User.findOne({facebookId: facebookId});
    },
    async updateUser(username, updateObject) {
        return await User.findOneAndUpdate({username: username}, updateObject);
    },
    async deleteUser(id) {
        return await User.findByIdAndRemove(id);
    },

    /**
     * //?key=&limit=&offset=&order_by=&order_direction=
     * @param {*} searchParams
     * search => từ để tìm kiếm
     * limit => số record tối đa
     * offset => bắt đầu từ record thứ mấy
     * order_by => sort field nào
     * order_direction => ('asc' hoặc 'desc') => sort theo thứ tự nào?
     * @returns
     */

    // 1/'asc'/'ascending': 1/1 -> 2/1 -> 3/1 or 
    // {$regex: key}: contain key
    // limit(2): limit to 2 items
    // sort: ignore records from 1(start) to offset
    // skip(offset):  skip the first offset items
    // ===> Full HD: https://mongoosejs.com/docs/api.html#query_Query-sort

    /**
     *  Operators that the schema supports
     $all, $eq, $exists, $gt, $gte, $in, $lt, $lte,
     $ne, $nin, $not, $options, $regex, $type
     */
    async findUsers(searchParams) {
        const {key, limit, offset, order_by, order_direction} = searchParams;
        let sortOrder = {};
        sortOrder[`${order_by}`] = order_direction;
        let filterQuery = [];
        filterQuery.push({firstname: {$regex: key || "", $options: 'i'}});
        filterQuery.push({email: {$regex: key || "", $options: 'i'}});
        filterQuery.push({isdeleted: 0});
        console.log(filterQuery);
        // var query = User.find().or({ isdeleted: 0, filterQuery })//isdeleted and filterQuery
        var query = User.find().or(filterQuery)
            .select('phone firstname email isdeleted')
            .limit(Number(limit))
            .skip(Number(offset))
            .sort(sortOrder)// .sort(`${sort}${order_by}`)
        return await query.exec();
    },
    async countAllUsers() {
        return await User.count();
    },
    async updateExpDate(filterObject, expSeconds) {
        var expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + Number(expSeconds/3600/24));
        return await User.findOneAndUpdate(filterObject, {expirationDate: expirationDate});
    },
    async addQuote(owner, newQuote) {
        owner.quotes.push(newQuote);
        return await owner.save();
    },
    async verifyToken(token) {
        // Full HD link: https://graph.facebook.com/me?fields=email,birthday,name,photos,about,first_name,last_name,gender%20&access_token=
        const endpoint = "https://graph.facebook.com/me/";
        const fields = "first_name, last_name, id, email";
        return await axios.get(endpoint, {
            params: {
                access_token: token,
                fields: fields
            }
        })
    }
}