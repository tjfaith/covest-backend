import { prismaClient } from "@/database";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string

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
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    const userToken = await prismaClient.user.findFirst({
      where: {
        AND: [{ id: decodedToken.userId }, { token: token }],
      },
      select: {
        token: true,
      },
    });

    const isUserFound = !!userToken;
    if (!isUserFound) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.auth = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
