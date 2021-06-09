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
    }
}