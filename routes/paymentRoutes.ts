import express from "express";
import * as paymentController from "@/controllers/paymentController";
import { validateInitPayment, validateVerifyPayment, validateBankTransfer, adminAuth, validateVerifyBankTransfer } from "@/middleware";
import { authenticateUser } from "@/middleware/authMiddleware";
import { upload } from "@/middleware";

const router = express.Router();

router.post("/initiate-payment", authenticateUser, validateInitPayment,  paymentController.initiatePayment);
router.post("/verify-payment", authenticateUser, validateVerifyPayment,  paymentController.verifyPayment);
router.post("/initiate-bank-transfer", authenticateUser, upload.single("payment_prof"),validateBankTransfer,  paymentController.bankTransfer )
router.patch("/verify-bank-transfer", adminAuth, validateVerifyBankTransfer,  paymentController.verifyBankTransfer )




export default router;
