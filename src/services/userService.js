import { userRepo } from '../repositories/index.js';

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
    async findUsers(searchParams) {
        return await userRepo.findUsers(searchParams);
    },
    async countAllUsers() {
        return await userRepo.countAllUsers();
    },
    async login(username, password) {
        let user = await userRepo.getUserByUserName(username);
        if (!user) {
            return null;
        } else {
            await user.validPassword(password);
            return user.toAuthJSON();
        }
    },
    loginFB(fbUser) {
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
}