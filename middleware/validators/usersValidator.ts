import Joi from 'joi';
import { Request, Response, NextFunction } from "express";

// VALIDATE UPDATE USER
const updateUserSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    phone_number: Joi.string(),
    gender: Joi.string(),
    marital_status: Joi.string(),
    date_of_birth: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    nok_full_name:Joi.string(),
    nok_email:Joi.string(),
    nok_phone_number:Joi.string(),
    nok_relationship:Joi.string(),
    nok_address:Joi.string()
}).or('first_name', 'last_name', 'phone_number', 'gender', 'marital_status', 'date_of_birth', 'address', 'city', 'state', 'country', 'nok_full_name', 'nok_email', 'nok_phone_number', 'nok_relationship', 'nok_address')
.messages({
  'object.missing': 'At least one field is required'
});;

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


// VALIDATE CHANGE PASSWORD
const changeUserSchema = Joi.object({
    previous_password: Joi.string().required(),
    new_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const validateUserPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = changeUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};