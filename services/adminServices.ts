import { CreateBootAdmin, EmailRequirement, LoginUserInput } from "@/interfaces";
import { Prisma, prismaClient } from "@/database";
import bcrypt from "bcrypt";

import {
  adminVerifyEmail,
    generateJwtToken,
    generatePassword,
    sendMail,
    verifyEmail,
  } from "@/services";
import { CreateUser, RoleType } from "@/interfaces/adminInterface";


export const newBootAdmin =async(adminData:CreateBootAdmin)=>{

    try {
        const existingBootAdmin = await prismaClient.user.findMany({
            where: {
                role: 'boot_admin'
            }
        });
        if(existingBootAdmin.length > 0){
            return { status: 409, message: "A boot admin already exist" }; 
        }
        const { email, password } = adminData;
        const hashedPassword = await bcrypt.hash(password, 10);
        const bootAdmin = await prismaClient.user.create({
          data: {
            email: email,
            password: hashedPassword,
            status: "pending",
            role:'boot_admin'
          },
        });


        const token = generateJwtToken({ userId: bootAdmin.id, email })
    
       await prismaClient.user.update({
          where: { id: bootAdmin.id },
          data: { token },
        }); 
        const message_payload: EmailRequirement = {
          to: [email],
          subject: "Verify Email",
          text: "You have successfully signed up as a boot admin, which serves as a super admin",
          template: verifyEmail({token}),
        };
        sendMail(message_payload);
    
        return {
          status: 201,
          message:
            "Boot admin created successfully, check your email to verify your account",
          data: '',
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
}

export const newUser = async(adminData:CreateUser, adminRole:RoleType)=>{

  try {
 
    const { email, role } = adminData;

    if(adminRole === 'retailer'){
      return {
        status: 401,
        message:"You don't have the access to create a User",
        data: {},
      };
    }
    if(adminRole === 'boot_admin' && role ==='boot_admin'){
      return {
        status: 401,
        message:'You cant create a boot_admin through this route',
        data: {},
      };
    }

    if(adminRole === 'admin' && role ==='boot_admin'){
      return {
        status: 401,
        message:"You don't have the access to create a Boot Admin",
        data: {},
      };
    }

    const password = generatePassword()
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: email,
        password: hashedPassword,
        status: "pending",
        role:role
      },
    });


    const token = generateJwtToken({ userId: user.id, email })

   await prismaClient.user.update({
      where: { id: user.id },
      data: { token },
    }); 
    const message_payload: EmailRequirement = {
      to: [email],
      subject: "Verify Email",
      text: "You have successfully signed up as a boot admin, which serves as a super admin",
      template: adminVerifyEmail({heading:'Hello!', body:`Your account has been created successfully, this is your temporary password: ${password}, <br/> verify your account by clicking on the button bellow, then change your password`, token}),
    };
    sendMail(message_payload);
    
    let user_role = 'Retailer'
    switch (role) {
      case 'admin':
        user_role ='Admin'
        break;
    
      default:
        user_role = 'Retailer'

    }
  
    return {
      status: 201,
      message:
        `${user_role} created successfully`,
      data: user,
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
}

export const updateUserData = async(userData:any)=>{
  try {
  const admin = await prismaClient.user.findUnique({
    where:{
      id:userData.adminId
    }
  })

  if(!admin){
    return {
      status:404,
      message:'Admin data not found'
    }
  }
  if(admin.role==='retailer'){
    return{
      status:401,
      message:'You are not authorized to update a user details'
    }
  }

  if(userData.role ==='boot_admin'){
    return{
      status:401,
      message:'You are not authorized to update a user to be a Boot Admin'
    }
  }

  const { userId, adminId, ...rest } = userData;
    const updatedUser = await prismaClient.user.update({
      where: { id: userId },
      data: rest
    });

    return {
      status:200,
      message: 'user data updated successfully',
      data:updatedUser
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { status: 404, message: "User Record to update not found" };
    } else {

    return {
      status:500,
      message:'internal server error',
      data:error
    }
  }
  }
}

export const adminLoginService = async (userData: LoginUserInput) => {
  const { email, password } = userData;

  try {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    if(user.role ==='user'){
      return { status: 404, message: "You are not authorized to use this route" };

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
    return { status: 500, message: "Internal server error", data:error };
  }
};