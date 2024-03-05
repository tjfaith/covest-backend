import { Prisma, prismaClient } from "@/database";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { CreateUserInput, EmailRequirement } from "@/interfaces";
import { Status } from "@prisma/client";


import {
  generateJwtToken,
  sendMail,
  verifyEmail,
  confirmForgotPasswordEmail,
  verifyJWT,
} from "@/services";
import {
  GoogleLoginDetails,
  GoogleSignupInstance,
  LoginUserInput,
} from "@/interfaces/userInterface";

export const signUp = async (userData: CreateUserInput) => {
  try {
    const { email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        email: email,
        password: hashedPassword,
        status: "pending",
      },
    });
    const token = generateJwtToken({ userId: newUser.id, email })

   await prismaClient.user.update({
      where: { id: newUser.id },
      data: { token },
    });
    const message_payload: EmailRequirement = {
      to: [email],
      subject: "Verify Email",
      text: "You are welcome",
      template: verifyEmail({token}),
    };
    sendMail(message_payload);

    return {
      status: 201,
      message:
        "User created successfully, check your email to verify your account",
      data: newUser,
    };
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

    if (user.status === "pending") {
      return { status: 403, message: "Account is pending approval." };
    }

    const token = generateJwtToken({ userId: user.id });

    await prismaClient.user.update({
      where: { id: user.id },
      data: { token },
    });

    return { status: 200, message: "Sign in successful", data: { token } };
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
      const user_payload:GoogleSignupInstance = {
        email: payload?.email?.toLowerCase() as string,
        first_name: payload?.given_name,
        last_name: payload?.family_name,
        avatar: payload?.picture,
        status: payload?.email_verified ? Status.active : Status.pending,
        password:await bcrypt.hash("SOCIAL_LOGIN", 10),
      };


      const newUser = await prismaClient.user.create({
        data: user_payload,
      });

      if(user_payload.status==='active'){
        await login({email:user_payload.email, password:user_payload.password})
      }
      return {
        status: 201,
        message: "User created successfully",
        user: newUser,
      };
    }

    if (user.status === "pending") {
      return { status: 401, message: "Please verify your email" };
    }

    const token = generateJwtToken({userId:user.id, email:user.email})
    await prismaClient.user.update({
      where: { id: user.id },
      data: { token },
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

  const token = generateJwtToken({ userId: user.id, email });

  const message_payload: EmailRequirement = {
    to: [email],
    subject: "Forgotten Password",
    text: "Retrieve your password",
    template: confirmForgotPasswordEmail({ token }),
  };
  sendMail(message_payload);

  await prismaClient.user.update({
    where: { id: user.id },
    data: { token },
  });

  return {
    status: 200,
    message: "Check your email for link to reset your password",
  };
};

export const resetPassword = async (userData: Record<string, string>) => {
  const { newPassword, confirmPassword, email, token } = userData;

  try {
    const decodedToken = verifyJWT(token);

    const userId = (decodedToken as any).userId;

    if ((decodedToken as any).email !== email) {
      return { status: 400, message: "Invalid User Email" };
    }

    if (confirmPassword !== newPassword) {
      return { status: 400, message: "Passwords do not match." };
    }

    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { status: 404, message: "User record not found" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await prismaClient.user.update({
      where: { email: email },
      data: { password: hashedPassword, token:'' },
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

export const resendUserActivationToken = async (email: string) => {
  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (user?.status !== "pending") {
    return { status: 403, message: "Account is not in pending state." };
  }

  if (!user) {
    return { status: 404, message: "User not found" };
  }
  
  const token = generateJwtToken({ userId: user.id, email });
  const message_payload: EmailRequirement = {
    to: [email],
    subject: "Verify Email",
    text: "You are welcome",
    template: verifyEmail({ token }),
  };
  sendMail(message_payload);

  await prismaClient.user.update({
    where: { id: user.id },
    data: { token },
  });
  return { status: 201, message: "Activation token resent successfully" };
};

export const verifyUserEmail = async (token: string) => {
  try {
    const decodedToken = verifyJWT(token);

    const { userId, email } = decodedToken as any;

    const user = await prismaClient.user.findFirst({
      where: {
        AND: [{ email: email }, { id: userId }],
      },
    });

    if (user?.status !== "pending") {
      return { status: 403, message: "Account is not in pending state." };
    }

    if (!user) {
      return { status: 404, message: "User not found or invalid token" };
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: { status: 'active',token:'' },
    });

    return {
      status: 200,
      message: "Account verified successfully .",
      data: updatedUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occurred while resetting the password.",
    };
  }
};

export const updateCurrentPassword = async (passwordData: Record<string, string>, userId:string) => {
  const {currentPassword, newPassword, confirmPassword } = passwordData;

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { status: 404, message: "User record not found" };
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return { status: 401, message: "Invalid current password" };
    }

    if (confirmPassword !== newPassword) {
      return { status: 400, message: "Passwords do not match." };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

   await prismaClient.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return {
      status: 200,
      message: "Password reset successful."
    };
  } catch (error) {
    return {
      status: 500,
      message: "An error occurred while resetting the password.",
    };
  }
};
