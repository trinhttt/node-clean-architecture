import { userService } from '../services/index.js';
export const userController = {
    async createUser(req, res, next) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json({
                success: true,
                message: 'New user created successfully',
                user: newUser,
            });
        } catch (error) {
            next(error);
        }
    },
    async getAllUsers(req, res, next) {
        try {
            const allUsers = await userService.getAllUsers();
            res.status(200).json({
                success: true,
                message: 'Got list',
                users: allUsers,
            });
        } catch (error) {
            next(error);
        }
    },
    async getSingleUser(req, res, next) {
        try {
            const id = req.params._id;
            const singleUser = await userService.getSingleUser(id);
            res.status(200).json({
                success: true,
                message: 'Got list',
                user: singleUser,
            });
        } catch (error) {
            next(error);
        }
    },
    async updateUser(req, res, next) {
        try {
            const username = req.params.username;
            const updateObject = req.body;
        
            const updateUser = await userService.updateUser(username, updateObject);
            res.status(200).json({
                success: true,
                message: 'User was updated',
                user: updateObject,
            });
        } catch (error) {
            next(error);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const id = req.params._id;
            const resultObject = await userService.deleteUser(id);
            const success = resultObject == null ? false : true
            const message = resultObject == null ? 'Can not find this user' : 'User was deleted'
            res.status(200).json({
                success: success,
                message: message,
            });
        } catch (error) {
            next(error);
        }
    },
    async findUsers(req, res, next) {
        try {
            const resultObject = await userService.findUsers(req.params);
            let total = await userService.countAllUsers();
            const itemsPerPage = req.params.limit;
            const currentPage = req.params.offset / itemsPerPage + 1;
            const totalPages = total / itemsPerPage;
            console.log(currentPage, resultObject.length, itemsPerPage);
            res.status(200).json({
                success: true,
                message: 'Got an user list',
                data: {
                    items: resultObject,
                    currentPage: currentPage,
                    itemCount: resultObject.length,
                    itemsPerPage: itemsPerPage,
                    totalItems: total,
                    totalPages: totalPages,
                },
            });
        } catch (error) {
            next(error);
        }
    },
}
      
