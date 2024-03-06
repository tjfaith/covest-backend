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

export const verifyJWT =(token:string)=>{
  return jwt.verify(token, JWT_SECRET);
}


export const generatePassword = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = "!@#$%^&*()-_=+";

  // Function to generate a random symbol
  const generateRandomSymbol = () =>
    symbols.charAt(Math.floor(Math.random() * symbols.length));

  // Function to generate a random digit
  const generateRandomDigit = () => Math.floor(Math.random() * 10);

  // Function to check if a character is uppercase
  const isUpperCase = (char: string) => /[A-Z]/.test(char);

  // Function to check if a character is lowercase
  const isLowerCase = (char: string) => /[a-z]/.test(char);

  // Function to check if a character is a symbol
  const isSymbol = (char: string) => /[!@#$%^&*()-_=+]/.test(char);

  // Function to check if a character is a digit
  const isDigit = (char: string) => /[0-9]/.test(char);

  let id = "";

  // Add at least one uppercase letter
  id += characters.charAt(Math.floor(Math.random() * characters.length));

  // Add at least one lowercase letter
  id += characters.charAt(Math.floor(Math.random() * characters.length)).toLowerCase();

  // Add at least one symbol
  id += generateRandomSymbol();

  // Add at least one number
  id += generateRandomDigit();

  // Add random characters to meet the length requirement (at least 6 characters)
  while (id.length < 6) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    id += isLowerCase(randomChar) ? randomChar.toUpperCase() : randomChar;
  }

  // Shuffle the id to ensure randomness
  id = id.split('').sort(() => Math.random() - 0.5).join('');

  return id;
};

