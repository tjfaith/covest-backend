import { Request, Response } from "express";
import { newBootAdmin,newUser, updateUserData,adminLoginService } from "@/services";

export const createBootAdmin =async(req: Request, res: Response)=>{
    try {
        const response = await newBootAdmin(req.body);
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

export const createUser =async(req: Request, res: Response)=>{
  try {
    const response = await newUser(req.body, req.auth?.role);
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

export const updateUser =async(req: Request, res: Response)=>{
  try {
    
    const response = await updateUserData({...req.body, adminId:req.auth?.userId});
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

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const response = await adminLoginService(req.body);
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
};