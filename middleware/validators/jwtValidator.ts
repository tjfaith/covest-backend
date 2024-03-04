import Joi from "joi";
import jwt from "jsonwebtoken";
import { prismaClient } from "@/database";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface CustomError {
  error: {
    message: string;
    status: number; // Add status property
  };
}

const jwtSchema = Joi.object({
  header: Joi.object({
    alg: Joi.string().required(),
    typ: Joi.string().required(),
  }),
  payload: Joi.object({
    userId: Joi.string().required(),
    email: Joi.string(),
    exp: Joi.number().integer().required(), // Expiration Time
    iat: Joi.number().integer().required(), // Issued At
  }),
});

const decodeJWT = async (token: string): Promise<CustomError | null> => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const userToken = await prismaClient.user.findFirst({
      where: {
        AND: [{ id: (decodedToken as any).userId }, { token: token }],
      },
      select: {
        token: true,
      },
    });

    const isUserFound = !!userToken;
    if (!isUserFound) {
      return { error: { message: "Invalid Token", status: 401 } };
    }

    // Decode the token to extract header and payload
    const [encodedHeader] = token.split(".").slice(0, 2);
    const decodedHeader = Buffer.from(encodedHeader, "base64").toString();

    // // Parse the JSON
    const parsedHeader = JSON.parse(decodedHeader);

    // Validate the decoded token using the schema
    const validationResult = jwtSchema.validate({
      header: parsedHeader,
      payload: decodedToken,
    });
    if (validationResult.error) {
      return {
        error: { message: validationResult.error.message, status: 400 },
      };
    }

    return null; // No error
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { error: { message: "Token has expired", status: 401 } };
    } else {
      return { error: { message: "Invalid token", status: 400 } };
    }
  }
};

export const validateJWTWithJoi = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.params.token) {
    token = req.params.token;
  } else if (req.query.token) {
    token = req.query.token;
  } else if (req.body.token) {
    token = req.body.token;
  }

  if (!token) {
    return res.status(400).json({ error: "Token not provided" });
  }

  const result = await decodeJWT(token);
  if (result !== null && result.error) {
    const { error } = result;
    let status: number = error.status;
    if ("status" in error) {
      status = error.status as number;
    }
    return res.status(status).json({
      error: error ? error.message : "Internal Server Error",
    });
  }

  next();
};
