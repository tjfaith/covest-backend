import Joi from 'joi';
import { Request, Response, NextFunction } from "express";

const PropertyType = Joi.string().valid('general', 'land');
const propertyDetailSchema = Joi.object().pattern(
  Joi.string(),
  Joi.alternatives().try(Joi.string(), Joi.number(), Joi.boolean())
);
// VALIDATE CREATE PROPERTY
const CreatePropertySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  images: Joi.array().required(),
  property_type:  PropertyType.required(),
  // property_details: Joi.array().items(propertyDetailSchema).required()
  property_details: Joi.string().required()
 });
 
 export const validateCreateProperty = (
   req: Request,
   res: Response,
   next: NextFunction
 ) => {
   const { error } = CreatePropertySchema.validate({...req.body, images:req.files});
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

 // VALIDATE UPDATE PROPERTY
 const AllPropertiesSchema = Joi.object({
  pageNumber: Joi.number().integer().min(1),
  pageSize: Joi.number().integer().min(1), // Adjust the maximum page size as needed
  propertyType: Joi.string().valid('general', 'land'), // Add more valid property types as needed
 });
 
 export const validateAllProperties = (
   req: Request,
   res: Response,
   next: NextFunction
 ) => {
   const { error } = AllPropertiesSchema.validate(req.query);
   if (error) {
     return res.status(400).json({ error: error.details[0].message });
   }
   next();
 };

  // VALIDATE UPDATE PROPERTY
  const SinglePropertySchema = Joi.object({
    property_id: Joi.string().required()
   });
   
   export const validateSingleProperty = (
     req: Request,
     res: Response,
     next: NextFunction
   ) => {
     const { error } = SinglePropertySchema.validate(req.params);
     if (error) {
       return res.status(400).json({ error: error.details[0].message });
     }
     next();
   };
