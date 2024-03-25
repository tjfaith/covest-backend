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
  property_details: Joi.string().required(),
  total_units: Joi.number().required(),
  roi: Joi.number().required(),
  // roi_duration:Joi.string()
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
  property_id: Joi.string().required(),
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.string(),
  images: Joi.array(),
  images_to_delete:Joi.array(),
  property_type:  PropertyType,
  property_details: Joi.string(),
  total_units: Joi.number(),
  roi: Joi.number(),
  // roi_duration:Joi.string()
}).or('title', 'last_name', 'description', 'images', 'images_to_delete', 'property_type', 'property_details','total_units','roi')
.messages({
  'object.missing': 'At least one field is required'
});;

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

  // VALIDATE GET SINGLE PROPERTY
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

    // VALIDATE DELETE PROPERTY
 const DeletePropertySchema = Joi.object({
  property_id: Joi.string().required()
 });
 
 export const validateDeleteProperty = (
   req: Request,
   res: Response,
   next: NextFunction
 ) => {
   const { error } = DeletePropertySchema.validate(req.params);
   if (error) {
     return res.status(400).json({ error: error.details[0].message });
   }
   next();
 };