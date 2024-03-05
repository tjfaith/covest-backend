import { initializePayment, verifyPaymentService } from "@/services";
import { Request, Response } from "express";

export const initiatePayment = async (req: Request, res: Response) => {

    try {
      const response = await initializePayment({...req.body, userId: req.auth?.userId});
      res.status(response.status).json(response);
    }  catch (error: unknown) { 
      let status: number = 500;
      if (error instanceof Error && "status" in error) {
        status = error.status as number;
      }
      res.status(status).json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  };


 export const verifyPayment = async(req: Request, res: Response)=> {
    try {
      const response = await verifyPaymentService(req.body);   
      res.status(response.status).json(response);
    }  catch (error: unknown) { 
      let status: number = 500;
      if (error instanceof Error && "status" in error) {
        status = error.status as number;
      }
      res.status(status).json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
    }
  };
