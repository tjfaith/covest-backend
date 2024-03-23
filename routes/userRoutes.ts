import express from "express";
import * as userController from "@/controllers/userController";
import { validateUpdateUser } from "@/middleware/validators/usersValidator";
import { authenticateUser } from "@/middleware/authMiddleware";

const router = express.Router();

router.patch("/update-data", authenticateUser, validateUpdateUser,  userController.updateUser);
router.get("/user-data", authenticateUser,  userController.getUserData);
router.get("/all",  userController.getAllUsers);

export default router;