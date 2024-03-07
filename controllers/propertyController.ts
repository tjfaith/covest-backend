import { Request, Response } from "express";
import { getAllProperties, newProperty, singleProperty, updateRetailerProperty } from "@/services";
import { AllPropertiesQuery } from "@/interfaces";

export const getProperty=async(req: Request, res: Response)=>{
  try {
    const { pageNumber, pageSize, propertyType } = req.query;
    
    const propertyQuery:Record<string, number | string>={
      pageNumber: Number(pageNumber) || 1,
      pageSize: Number(pageSize) || 10,
      propertyType: propertyType as string
    }
    const response = await getAllProperties(propertyQuery);
    res.status(response.status).json(response);
  } catch (error: unknown) {
    let status: number = 500;
    if (error instanceof Error && "status" in error) {
      status = error.status as number;
    }
    res.status(status).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}

export const getSingleProperty=async(req: Request, res: Response)=>{
  try {
      const response = await singleProperty(req.params.property_id);
      res.status(response.status).json(response);
    } catch (error: unknown) {
      let status: number = 500;
      if (error instanceof Error && "status" in error) {
        status = error.status as number;
      }
      res.status(status).json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
    }
}

export const createProperty=async(req: Request, res: Response)=>{
    try {
        const response = await newProperty({...req.body,files:req.files, retailer_id:req.auth?.userId});
        res.status(response.status).json(response);
      } catch (error: unknown) {
        let status: number = 500;
        if (error instanceof Error && "status" in error) {
          status = error.status as number;
        }
        res.status(status).json({
          error: error instanceof Error ? error.message : "Internal Server Error",
        });
      }
}

export const updateProperty=async(req: Request, res: Response)=>{
  try {
    const response = await updateRetailerProperty({...req.body,files:req.files, retailer_id:req.auth?.userId});
    res.status(response.status).json(response);
  } catch (error: unknown) {
    let status: number = 500;
    if (error instanceof Error && "status" in error) {
      status = error.status as number;
    }
    res.status(status).json({
      error: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
}

export const deleteProperty=()=>{

}