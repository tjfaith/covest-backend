import express from "express";
import * as paymentController from "@/controllers/paymentController";
import { validateInitPayment, validateVerifyPayment } from "@/middleware/validators/paymentValidator";
import { authenticateUser } from "@/middleware/authMiddleware";

const router = express.Router();

router.post("/initiate-payment", authenticateUser, validateInitPayment,  paymentController.initiatePayment);
router.post("/verify-payment", authenticateUser, validateVerifyPayment,  paymentController.verifyPayment);




export default router;
