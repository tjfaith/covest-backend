import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateUniqueId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    Array.from({ length: 3 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("") +
    Math.random().toString().substring(2, 6) +
    Date.now().toString().slice(-4)
  ).substring(0, 9);
};

export const generateJwtToken = (
  encryptPayload: Record<string, string>,
  duration: string = "1h"
) => {
  return jwt.sign(encryptPayload, JWT_SECRET, { expiresIn: duration });
};
