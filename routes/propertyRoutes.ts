import express from "express";
import * as propertyController from "@/controllers/propertyController";
import {
  validateCreateProperty,
  validateUpdateProperty,
  validateDeleteProperty,
  validateAllProperties,
  validateSingleProperty,
  adminAuth,
  authenticateUser,
  upload,
} from "@/middleware";

const router = express.Router();

router.get(
  "/get-all-property",
  authenticateUser,
  validateAllProperties,
  propertyController.getProperty
);
router.get(
  "/get-single-property/:property_id",
  authenticateUser,
  validateSingleProperty,
  propertyController.getSingleProperty
);
router.post(
  "/create-property",
  adminAuth,
  upload.array("images"),
  validateCreateProperty,
  propertyController.createProperty
);
router.patch(
  "/update-property",
  adminAuth,
  upload.array("images"),
  validateUpdateProperty,
  propertyController.updateProperty
);
router.delete(
  "/delete-property/:property_id",
  adminAuth,
  validateDeleteProperty,
  propertyController.deleteProperty
);

export default router;
