import express from "express";
import * as propertyController from "@/controllers/propertyController";
import { validateCreateProperty, validateUpdateProperty, validateDeleteProperty } from "@/middleware/validators/propertyValidator";
import { adminAuth } from "@/middleware/adminAuthMiddleware";
import { authenticateUser } from "@/middleware/authMiddleware";

const router = express.Router();

router.get("/get-all-property",  authenticateUser, propertyController.getProperty);
router.get("/get-single-property",  authenticateUser, propertyController.getSingleProperty);
router.post("/create-property", adminAuth, validateCreateProperty,  propertyController.createProperty);
router.patch("/update-property", adminAuth, validateUpdateProperty,  propertyController.updateProperty);
router.delete("/delete-property", adminAuth, validateDeleteProperty,  propertyController.deleteProperty);

export default router;