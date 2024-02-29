import {Prisma, prismaClient} from '@/database';
import bcrypt from 'bcrypt';

import { CreateUserInput } from '@/interfaces/userInterface';


const createUser = async (userData: CreateUserInput) => {
  try {
    const { email, password } = userData;

    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = await prismaClient.user.create({
      data: {
        email:email,
        password: hashedPassword,
      },
    });
    return newUser; 
  } catch (error) {
    console.log(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error('Email already exists');
    } else {
      throw new Error('Failed to create user');
    }
  }
};


const updateUser = async(userData: CreateUserInput, userId:string)=>{
console.log(userId,'USER ID...')
}

const getAllUsers = async () => {
  try {
    return await prismaClient.user.findMany();
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export default {
  createUser,
  updateUser,
  getAllUsers
};
