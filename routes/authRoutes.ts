import express from "express";
import * as authController from "@/controllers/authController";
import {
  validateCreateUserInput,
  validateGoogleLogin,
  validateInitiateForgottenPassword,
  validateResetPassword,
} from "@/middleware/validators/authValidator";

const router = express.Router();

router.post("/signup", validateCreateUserInput, authController.userSignUp);
router.post("/login", validateCreateUserInput, authController.userLogin);
router.post("/google-auth", validateGoogleLogin, authController.googleAuth);
router.post(
  "/initiate-forgot-password",
  validateInitiateForgottenPassword,
  authController.initForgotPassword
);
router.post(
  "/reset-password",
  validateResetPassword,
  authController.userRestPassword
);

export default router;
