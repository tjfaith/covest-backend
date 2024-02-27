import { Request, Response } from "express";
import {signUp, login, googleLogin, initiateForgotPassword, resetPassword} from "@/services/authServices";

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const response = await signUp(req.body);
    res.status(response.status).json(response);
  } catch (error: unknown) {
    let status: number = 500;
    if (error instanceof Error && "status" in error) {
      status = error.status as number;
    }
    res
      .status(status)
      .json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const response = await login(req.body);
    res.status(response.status).json(response);
  } catch (error: unknown) {
    let status: number = 500;
    if (error instanceof Error && "status" in error) {
      status = error.status as number;
    }
    res
      .status(status)
      .json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const response = await googleLogin(req.body);
    res.status(response.status).json(response);
  } catch (error: unknown) {
    let status: number = 500;
    if (error instanceof Error && "status" in error) {
      status = error.status as number;
    }
    res
      .status(status)
      .json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
  }
};

export const initForgotPassword = async (req: Request, res: Response) => {
  try {
    const response = await initiateForgotPassword(req.body);
    res.status(response.status).json(response);
  } catch (error: unknown) {
    let status: number = 500;
    if (error instanceof Error && "status" in error) {
      status = error.status as number;
    }
    res
      .status(status)
      .json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
  }
};

export const userRestPassword = async (req: Request, res: Response) => {
  try {
    const response = await resetPassword(req.body);
    res.status(response.status).json(response);
  } catch (error: unknown) {
    let status: number = 500;
    if (error instanceof Error && "status" in error) {
      status = error.status as number;
    }
    res
      .status(status)
      .json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
  }
};