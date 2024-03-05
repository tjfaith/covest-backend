import { prismaClient } from "@/database";
import { verifyJWT } from "@/services";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';


declare global {
  namespace Express {
    interface Request {
      auth?: JwtPayload;
    }
  }
}

export const adminAuth = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = verifyJWT(token) as JwtPayload;
    
    const adminFound = await prismaClient.user.findFirst({
      where: {
        AND: [{ id: decodedToken.userId }, { token: token }, { role: { not: 'user' } }],
      },
      select: {
        token: true,
        role:true,
      },
    });

    const isUserFound = !!adminFound;
    if (!isUserFound) {
      return res.status(401).json({ message: 'Not Authorized or invalid token' });
    }

    req.auth = decodedToken;
    req.auth.role = adminFound.role
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
