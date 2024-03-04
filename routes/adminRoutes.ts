import express from "express";
import * as adminController from "@/controllers/adminController";
import { validateCreateBootAdmin, validateCreateUser, validateUpdateUser } from "@/middleware/validators/adminValidator";
import { adminAuth } from "@/middleware/adminAuthMiddleware";

const router = express.Router();

router.post("/create-boot-admin", validateCreateBootAdmin,  adminController.createBootAdmin);
router.post("/create-user", adminAuth, validateCreateUser,  adminController.createUser);
router.patch("/update-user", adminAuth, validateUpdateUser,  adminController.updateUser);

export default router;