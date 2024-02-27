import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

export const googleLoginSchema = Joi.object({
  idToken: Joi.string().required(),
});

export const initiateForgottenPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const initiateResetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  confirmPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  token:Joi.string().required()
});