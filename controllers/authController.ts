import { Request, Response } from "express";
import {
  signUp,
  login,
  googleLogin,
  initiateForgotPassword,
  resetPassword,
  resendUserActivationToken,
  verifyUserEmail,
  updateCurrentPassword,
} from "@/services";

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const response = await signUp(req.body);
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

export const resendActivationToken = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const response = await resendUserActivationToken(email);
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

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const response = await verifyUserEmail(token as string);
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

export const userLogin = async (req: Request, res: Response) => {
  try {
    const response = await login(req.body);
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

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const response = await googleLogin(req.body);
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

export const initForgotPassword = async (req: Request, res: Response) => {
  try {
    const response = await initiateForgotPassword(req.body);
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

export const userRestPassword = async (req: Request, res: Response) => {
  try {
    const response = await resetPassword(req.body);
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

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const response = await updateCurrentPassword(req.body, req.auth?.userId);
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
