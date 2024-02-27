import { Request, Response, NextFunction } from 'express';
import { createUserSchema, loginUserSchema, googleLoginSchema, initiateForgottenPasswordSchema, initiateResetPasswordSchema } from '@/validators/validatorSchemas';

export const validateCreateUserInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = createUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateLoginUserInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateGoogleLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = googleLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateInitiateForgottenPassword = (req: Request, res: Response, next: NextFunction) => {
  const { error } = initiateForgottenPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const validateResetPassword = (req: Request, res: Response, next: NextFunction) => {
  const { error } = initiateResetPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
