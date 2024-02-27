import { Request, Response } from "express";
import UserService from "@/services/userServices";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json(newUser);
  }  catch (error: unknown) { 
    res.status(400).json({ error: (error as Error).message }); 
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await UserService.updateUser(req.body);
    res.status(201).json(updatedUser);
  }  catch (error: unknown) { 
    res.status(400).json({ error: (error as Error).message }); 
  }
};





export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers(); 
    res.status(200).json(users);
  } catch (error: unknown) { 
    res.status(400).json({ error: (error as Error).message }); 
  }
};
