import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

export const get_all_users = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal server error');
  }
};


interface CreateUserInput {
  email: string;
  password: string;
}



export const register_user = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as CreateUserInput;

    // Validate user input
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    // Check if the email is already in use
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).send('Email is already registered');
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        // Add other user properties here
      },
    });

    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal server error');
  }
};
