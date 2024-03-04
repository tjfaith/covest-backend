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