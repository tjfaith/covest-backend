import { Prisma, prismaClient } from "@/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import { CreateUserInput, EmailRequirement } from "@/interfaces";
import {
  generateUniqueId,
  sendMail,
  verifyEmail,
  confirmForgotPasswordEmail,
} from "@/services";
import {
  GoogleLoginDetails,
  LoginUserInput,
  UserInstance,
} from "@/interfaces/userInterface";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signUp = async (userData: CreateUserInput) => {
  try {
    const { email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const message_payload: EmailRequirement = {
      to: [email],
      subject: "Verify Email",
      text: "You are welcome",
      template: verifyEmail({ token: generateUniqueId() }),
    };
    sendMail(message_payload);

    return { status: 201, message: "User created successfully", data: newUser };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { status: 409, message: "Email already exists" };
    } else {
      return { status: 500, message: "Failed to create user" };
    }
  }
};

export const login = async (userData: LoginUserInput) => {
  const { email, password } = userData;

  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { status: 401, message: "Invalid credentials" };
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    

    return { status: 200, message: "Sign in successful", data: {token} };
  } catch (error) {
    return { status: 500, message: "Internal server error" };
  }
};

export const googleLogin = async (googleAuthDetails: GoogleLoginDetails) => {
  const googleClientId = process.env.CLIENT_ID;
  const client = new OAuth2Client(googleClientId);

  const { idToken } = googleAuthDetails;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();

    const user = await prismaClient.user.findUnique({
      where: { email: payload?.email?.toLowerCase() },
    });

    if (!user) {
      const user_payload = {
        email: payload?.email?.toLowerCase() as string,
        first_name: payload?.given_name,
        last_name: payload?.family_name,
        avatar: payload?.picture,
        status: payload?.email_verified ? "active" : "pending",
        password: "SOCIAL_LOGIN",
      };

      const newUser = await prismaClient.user.create({
        data: user_payload,
      });

      return {
        status: 201,
        message: "User created successfully",
        user: newUser,
      };
    }

    if (user.status === "pending") {
      return { status: 401, message: "Please verify your email" };
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { status: 200, message: "Sign in successful", data: token };
  } catch (error) {
    return { status: 500, error: "Failed to authenticate with Google" };
  }
};

export const initiateForgotPassword = async (
  userData: Record<string, string>
) => {
  const { email } = userData;
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { status: 404, message: "User record not found" };
  }

  if (user.status === "pending") {
    return { status: 403, message: "Account is pending approval." };
  }

  const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '1h' });

  const message_payload: EmailRequirement = {
    to: [email],
    subject: "Forgotten Password",
    text: "Retrieve your password",
    template: confirmForgotPasswordEmail({ token }),
  };
  sendMail(message_payload);
  return {
    status: 200,
    message: "Check your email for link to reset your password",
  };
};

export const resetPassword = async (userData: Record<string, string>) => {
  const { newPassword, confirmPassword, email, token } = userData;
 
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const userId = (decodedToken as any).userId;

     if ((decodedToken as any).email !== email) {
      return { status: 400, message: "Invalid token" };
    }

    if (confirmPassword !== newPassword) {
      return { status: 400, message: "Passwords do not match." };
    }

       const user = await prismaClient.user.findUnique({
        where: { id:userId },
      });
  
      if (!user) {
        return { status: 404, message: "User record not found" };
      }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prismaClient.user.update({
      where: { email: email },
      data: { password: hashedPassword },
    });
    return {
      status: 200,
      message: "Password reset successful.",
      data: updatedUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occurred while resetting the password.",
    };
  }
};
