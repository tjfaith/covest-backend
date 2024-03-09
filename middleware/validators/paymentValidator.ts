import Joi from 'joi';
import { Request, Response, NextFunction } from "express";

// VALIDATE INITIATE PAYMENT
const InitPaymentSchema = Joi.object({
  email: Joi.string().email().required(),
  amount: Joi.number().required(),
  propertyId: Joi.string().required()
});

export const validateInitPayment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = InitPaymentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// VALIDATE VERIFY PAYMENT
const verifyPaymentSchema = Joi.object({
  paymentRef: Joi.string().required(),
  amount: Joi.number().required()
});

export const validateVerifyPayment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = verifyPaymentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


// VALIDATE BANK TRANSFER
const verifyIniBankTransferSchema = Joi.object({
  paymentRef: Joi.string().required(),
  property_id: Joi.string().required(),
  amount: Joi.number().required(),
  paymentProf: Joi.string(),
});

export const validateBankTransfer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = verifyIniBankTransferSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// VALIDATE VERIFY BANK TRANSFER
const verifyBankTransferSchema = Joi.object({
  payment_id:Joi.string().required(),
  property_id: Joi.string().required(),
  payee_id: Joi.string().required(),
  paymentProfID: Joi.string().required(),
  amount: Joi.number().required(),
  paymentRef: Joi.string().required(),
});

export const validateVerifyBankTransfer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = verifyBankTransferSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};