import express from 'express';

import {
  quoteController,
  userController
} from '../controllers/index.js';

const router = express.Router();

router.post("/quote", quoteController.createQuote);
router.get("/quotes", quoteController.getAllQuotes);
router.put("/quotes/:name", quoteController.updateQuote);
router.delete("/quotes/:_id", quoteController.deleteQuote);

router.post("/user", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:_id", userController.getSingleUser);
router.put("/users/:username", userController.updateUser);
router.delete("/users/:_id", userController.deleteUser);

export default router;