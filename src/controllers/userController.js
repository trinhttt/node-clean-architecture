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
    async getUsers(req, res, next) {
        console.log("findUsers");
        try {
            // !req.query / req.query == null is not right
            // req.query = {} but (req.query == null) is SOMETIME wrong
            //(typeof req.query === 'object' && Object.keys(req.query).length === 0)
            const { value } = req.query;
            if (!value) {
                const allUsers = await userService.getAllUsers();
                res.status(200).json({
                    success: true,
                    message: 'Got list',
                    users: allUsers,
                });
            } else {
                console.log(req.query)
                const resultObject = await userService.findUsers(req.query);
                const total = await userService.countAllUsers();
                const itemsPerPage = req.query.limit;
                const currentPage = req.query.offset / itemsPerPage + 1;
                const totalPages = total % itemsPerPage == 0 ? total / itemsPerPage : Math.floor(total / itemsPerPage) + 1;
                console.log(currentPage, resultObject.length, itemsPerPage, totalPages);
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
            }
        } catch (error) {
            next(error);
        }
    },
    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const userInfo = await userService.login(username, password);
            if (userInfo == null) {
                res.status(200).json({
                    success: false,
                    message: 'Login fail',
                });
            }
            res.status(201).json({
                success: true,
                message: 'Login successfully',
                user: userInfo,
            });
        } catch (error) {
            next(error);
        }
    }
}

