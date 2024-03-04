import Joi from 'joi';
import { Request, Response, NextFunction } from "express";

// VALIDATE CREATE BOOT ADMIN
const CreateBootAdminSchema = Joi.object({
    
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