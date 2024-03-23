import express from "express";
import * as authController from "@/controllers/authController";
import {
  validateCreateUserInput,
  validateLoginUserInput,
  validateGoogleLogin,
  validateInitiateForgottenPassword,
  validateResendActivationToken,
  validateResetPassword,
  validateUpdatePassword,
} from "@/middleware/validators/authValidator";

import {validateJWTWithJoi} from '@/middleware/validators/jwtValidator'
import { authenticateUser } from "@/middleware/authMiddleware";

const router = express.Router();

router.post("/signup", validateCreateUserInput, authController.userSignUp);
router.post("/login", validateLoginUserInput, authController.userLogin);
router.post("/google-auth", validateGoogleLogin, authController.googleAuth);
router.post(
  "/resend-activation-token",
  validateResendActivationToken,
  authController.resendActivationToken
);
router.post(
  "/initiate-forgot-password",
  validateInitiateForgottenPassword,
  authController.initForgotPassword
);
router.post(
  "/reset-password",
  validateJWTWithJoi,
  validateResetPassword,
  authController.userRestPassword
);

router.get("/verify-email/:token", validateJWTWithJoi, authController.verifyEmail);
router.patch("/update-password", authenticateUser,validateUpdatePassword,  authController.updatePassword);
export default router;
