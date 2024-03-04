import { Request, Response } from "express";
import {updateUserService, getAllUsersService} from "@/services/userServices";


export const updateUser = async (req: Request, res: Response) => {

  try {
    const response = await updateUserService(req.body, req.auth?.userId);
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



export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService(); 
    res.status(200).json(users);
  } catch (error: unknown) { 
    res.status(400).json({ error: (error as Error).message }); 
  }
};
