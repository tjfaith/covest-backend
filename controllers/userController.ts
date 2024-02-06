import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const get_all_users = async (req: Request, res: Response) => {
  res.send(await prisma.user.findMany());
};

module.exports = {
  get_all_users,
};
