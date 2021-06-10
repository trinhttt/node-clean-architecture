import User from '../models/userModel.js';

export const userRepo = {
    async createUser(reqBody) {
        const newUser = new User({
            email: reqBody.email,
            username: reqBody.username,
            password: reqBody.password,
            firstname: reqBody.firstname,
            lastname: reqBody.lastname,
            gender: reqBody.gender,
            phone: reqBody.phone,
        })
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
        return User.findById(id);
    },
    async updateUser(username, updateObject) {
        return await User.findOneAndUpdate({ username: username }, updateObject);
    },
    async deleteUser(id) {
        return await User.findByIdAndRemove(id);
    },

    /**
     * 
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
    async findUsers(searchParams) {
        const { key, limit, offset, order_by, order_direction } = searchParams;
        const sort = Number(order_direction) === 1 ? '' : '-'
        var query = User.find({ isdeleted: 0, firstname: { $regex: key } })
            .select('phone firstname email isdeleted')
            .limit(Number(limit))
            .skip(Number(offset))
            .sort(`${sort}${order_by}`)
        console.log(query)
        return await query.exec();
    }
}