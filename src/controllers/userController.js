import { userService } from '../services/index.js';
import returnSuccess from '../utilities/successHandler.js'

export const userController = {
    async createUser(req, res, next) {
        try {
            const newUser = await userService.createUser(req.body);
            returnSuccess(201, res, 'New user created successfully', newUser)
        } catch (error) {
            next(error);
        }
    },
    async getSingleUser(req, res, next) {
        try {
            const id = req.params._id;
            const singleUser = await userService.getSingleUser(id);
            returnSuccess(200, res, 'Got list', singleUser)
        } catch (error) {
            next(error);
        }
    },
    async updateUser(req, res, next) {
        try {
            const username = req.params.username;
            const updateObject = req.body;

            const updateUser = await userService.updateUser(username, updateObject);
            returnSuccess(200, res, 'User was updated', updateObject)
        } catch (error) {
            next(error);
        }
    },
    async deleteUser(req, res, next) {
        try {
            const id = req.params._id;
            const resultObject = await userService.deleteUser(id);
            if (resultObject == null) {
                throw {
                    message: 'Can not find this user',
                    status: 200
                }
            }
            returnSuccess(200, res, 'User was deleted', null)
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
                returnSuccess(200, res, 'Got list', allUsers)
            } else {
                console.log(req.query)
                const resultObject = await userService.findUsers(req.query);
                const total = await userService.countAllUsers();
                const itemsPerPage = req.query.limit;
                const currentPage = req.query.offset / itemsPerPage + 1;
                const totalPages = total % itemsPerPage == 0 ? total / itemsPerPage : Math.floor(total / itemsPerPage) + 1;
                console.log(currentPage, resultObject.length, itemsPerPage, totalPages);
                const data = {
                        items: resultObject,
                        currentPage: currentPage,
                        itemCount: resultObject.length,
                        itemsPerPage: itemsPerPage,
                        totalItems: total,
                        totalPages: totalPages,
                    }
                returnSuccess(200, res, 'Got an user list', data);
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
            returnSuccess(200, res, 'Login successfully', userInfo);
        } catch (error) {
            next(error);
        }
    },
    async verifyFBToken(req, res, next) {
        try {
            const { token } = req.body;
            const verifyResponse = await userService.verifyToken(token);
            var fbUser = await userService.getFBUser(verifyResponse.data.id);

            if (fbUser?.facebookId == null) {
                // Create a new FB user
                const newUser = {
                    facebookId: verifyResponse.data.id,
                    firstname: verifyResponse.data.first_name,
                    lastname: verifyResponse.data.last_name,
                    email: verifyResponse.data.email
                }
                fbUser = await userService.createUser(newUser);
            }

            const userInfo = await userService.loginFB(fbUser)
            returnSuccess(200, res, 'Login successfully', userInfo);
        } catch (error) {
            next(error);
        }
    },
    async logout(req, res, next) {
        try {
            var expiredUser = await userService.setExpirationDate(req.body._id);
            returnSuccess(200, res, 'Logged out', null);
        } catch (error) {
            next(error);
        }
    }
}

