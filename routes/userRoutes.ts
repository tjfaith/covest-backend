import express from "express";
import * as userController from "@/controllers/userController";
import { validateCreateUserInput } from '@/validators/userValidator';

const router = express.Router();

router.post("/register", validateCreateUserInput,  userController.createUser);
router.get("/all",  userController.getAllUsers);



export default router;
