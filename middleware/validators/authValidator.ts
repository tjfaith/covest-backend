import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// VALIDATE CREATE USER
const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+={}[\]:;'",.<>?/\\]).{6,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one symbol, one number, and be at least 6 characters long",
    }),
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
  password: Joi.string().required(),
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

// RESEND ACTIVATION TOKEN
const resendActivationTokenSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const validateResendActivationToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = resendActivationTokenSchema.validate(req.body);
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
  newPassword: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+={}[\]:;'",.<>?/\\]).{6,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one symbol, one number, and be at least 6 characters long",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().messages({
    'any.only': 'Passwords do not match',
  }),
  token: Joi.string().required(),
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

// VALIDATE RESET PASSWORD
const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+={}[\]:;'",.<>?/\\]).{6,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one symbol, one number, and be at least 6 characters long",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required().messages({
    'any.only': 'Passwords do not match',
  })
});

export const validateUpdatePassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updatePasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
