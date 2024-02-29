import Joi from 'joi';
import { Request, Response, NextFunction } from "express";

// VALIDATE CREATE USER
const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

export const validateCreateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


// VALIDATE LOGIN USER
const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

export const validateLoginUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// VALIDATE GOOGLE LOGIN
const googleLoginSchema = Joi.object({
  idToken: Joi.string().required(),
});

export const validateGoogleLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = googleLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// VALIDATE INITIATE FORGOTTEN PASSWORD
const initiateForgottenPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const validateInitiateForgottenPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = initiateForgottenPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// VALIDATE RESET PASSWORD
const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirmPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  token:Joi.string().required()
});

export const validateResetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = resetPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};