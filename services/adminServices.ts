import { CreateBootAdmin, EmailRequirement } from "@/interfaces";
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
        console.log(error)
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
    console.log(error)
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