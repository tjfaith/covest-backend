import Joi from 'joi';
import { Request, Response, NextFunction } from "express";

// VALIDATE CREATE PROPERTY
const CreatePropertySchema = Joi.object({
    
 });
 
 export const validateCreateProperty = (
   req: Request,
   res: Response,
   next: NextFunction
 ) => {
   const { error } = CreatePropertySchema.validate(req.body);
   if (error) {
     return res.status(400).json({ error: error.details[0].message });
   }
   next();
 };

 // VALIDATE UPDATE PROPERTY
const UpdatePropertySchema = Joi.object({
    
});

export const validateUpdateProperty = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = UpdatePropertySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

 // VALIDATE UPDATE PROPERTY
 const DeletePropertySchema = Joi.object({
    
 });
 
 export const validateDeleteProperty = (
   req: Request,
   res: Response,
   next: NextFunction
 ) => {
   const { error } = DeletePropertySchema.validate(req.body);
   if (error) {
     return res.status(400).json({ error: error.details[0].message });
   }
   next();
 };