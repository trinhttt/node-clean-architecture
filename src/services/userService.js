import { userRepo } from '../repositories/index.js';
import config from '../config/index.js';

export const userService = {
    async createUser(name, user) {
        return await userRepo.createUser(name, user);
    },
    async getAllUsers() {
        return await userRepo.getAllUsers();
    },
    async getSingleUser(id) {
        return await userRepo.getSingleUser(id);
    },
    async updateUser(username, updateObject) {
        return await userRepo.updateUser(username, updateObject);
    },
    async deleteUser(id) {
        return await userRepo.deleteUser(id);
    },
    findUsers(searchParams) {
        return userRepo.findUsers(searchParams);
    },
    async countAllUsers() {
        return await userRepo.countAllUsers();
    },
    async login(username, password) {
        const filterObject = {username: username}
        let user = await userRepo.updateExpDate(filterObject, config.expTime);
        if (!user) {
            return null;
        } else {
            await user.validPassword(password);
            return user.toAuthJSON();
        }
    },
    async loginFB(fbUser) {
        const filterObject = {facebookId: fbUser.facebookId}
        await userRepo.updateExpDate(filterObject, config.expTime);
        return fbUser.toAuthJSON();
    },
    async addQuote(owner, newQuote) {
        return await userRepo.addQuote(owner, newQuote);
    },
    async verifyToken(token) {
        return await userRepo.verifyToken(token);
    },
    async getFBUser(facebookId) {
        return await userRepo.getFBUser(facebookId);
    },
    async setExpirationDate(id) {
        const filterObject = {_id: id}
        const lifeTime = 0
        return await userRepo.updateExpDate(filterObject, lifeTime);
    },
    async checkExpTime(id) {
        const user = await userRepo.getSingleUser(id);
        // let userExpTime = user.expirationDate.getSeconds();
        let today = new Date();
        return user.expirationDate > today ? true : false
    }
}