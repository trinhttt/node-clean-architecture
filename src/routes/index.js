import express from 'express';

import {
  quoteController,
  userController
} from '../controllers/index.js';
import authHandler from '../middlewares/authHandler.js'

const router = express.Router();

router.post("/quote", quoteController.createQuote);
router.get("/quotes", quoteController.getAllQuotes);
router.put("/quotes/:name", quoteController.updateQuote);
router.delete("/quotes/:_id", quoteController.deleteQuote);
router.get("/quotes/:name", quoteController.getOneByName);

router.post("/user", userController.createUser);
router.post("/login", userController.login);
router.post("/verify_token", userController.verifyFBToken);

router.use(authHandler);//??
router.get("/users", userController.getUsers);
router.get("/users/:_id", userController.getSingleUser);
router.put("/users/:username", userController.updateUser);
router.delete("/users/:_id", userController.deleteUser);
router.post("/logout", userController.logout);//update object get or post??

export default router;