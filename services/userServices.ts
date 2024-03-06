import { prismaClient} from '@/database';
import { UserInstance } from '@/interfaces';


export const updateUserService = async(userData:UserInstance, userId:string)=>{
  try {
  
  const updatedUser = await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: userData, 
  });
  return { status: 200, message: "Data Updated Successfully", data: updatedUser };
} catch (error) {
  return { status: 500, message: "Internal server error" };
}

}


export const getAllUsersService = async () => {
  try {
    return await prismaClient.user.findMany();
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};
