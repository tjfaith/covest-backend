import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// VALIDATE CREATE BOOT ADMIN
const CreateBootAdminSchema = Joi.object({
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

export const validateCreateBootAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = CreateBootAdminSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// VALIDATE CREATE USER
const CreateUserSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().required(),
});

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = CreateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// VALIDATE UPDATE USER
const UpdateUserSchema = Joi.object({
  role: Joi.string(),
  status: Joi.string(),
  userId: Joi.string().required(),
})
  .or("role", "status")
  .messages({
    "object.missing": "At least one field is required",
  });

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = UpdateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


// VALIDATE ADMIN LOGIN
const AdminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+={}[\]:;'",.<>?/\\]).{6,}$/
  ).required().messages({
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one symbol, one number, and be at least 6 characters long",
  }),
})

export const validateAdminLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = AdminLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};