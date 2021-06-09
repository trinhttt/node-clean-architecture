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
        return new Promise((resolve, reject) => {
            newUser
                .save()
                .then(newUserObj => resolve(newUserObj))
                .catch(error => reject(error));
        });
    },
    
    async getAllUsers() {
        return new Promise((resolve, reject) => {
            User
                .find()
                .then(allUsers => resolve(allUsers))
                .catch(error => reject(error));
        });
    },
    async getSingleUser(id) {
        return new Promise((resolve, reject) => {
            User
                .findById(id)
                .then(singleUser => resolve(singleUser))
                .catch(error => reject(error));
        });
    },
    async updateUser(username, updateObject) {
        return new Promise((resolve, reject) => {
            User.
                findOneAndUpdate({ username: username }, updateObject)
                .exec()
                .then(() => resolve(updateObject))
                .catch(error => reject(error));
        });
    },
    async deleteUser(id) {
        return new Promise((resolve, reject) => {
            User.
                findByIdAndRemove(id)
                .exec()
                .then((result) => {
                    console.log(result)
                    if (result == null) {
                        resolve({
                            success: false,
                            message: 'Can not find this user',
                        })
                    } else {
                        resolve({
                            success: true,
                            message: 'User was deleted',
                        })
                    }
                })
                .catch(error => reject(error));
        });
    }
}