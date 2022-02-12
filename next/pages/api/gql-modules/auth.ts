import 'dotenv/config';
import jwt from 'jsonwebtoken';

type GenerateJwtParams = {
  userId: number;
};

export const generateJwt = ({ userId }: GenerateJwtParams): string => {
  console.log('secret = ', process.env.JWT_SECRET);
  return jwt.sign({ userId }, process.env.JWT_SECRET as string);
};

export const validateJwt = (token: string): boolean => {
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return true;
  } catch {
    return false;
  }
};
