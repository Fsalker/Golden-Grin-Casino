import jwt from "jsonwebtoken";
import { JwtPayload } from "./types";

type GenerateJwtParams = {
  userId: number;
};

export const generateJwt = ({ userId }: GenerateJwtParams): string =>
  jwt.sign({ userId } as JwtPayload, process.env.JWT_SECRET as string);

export const validateJwt = (token: string): boolean => {
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return true;
  } catch {
    return false;
  }
};

export const getJwtPayload = (token: string): JwtPayload =>
  jwt.decode(token) as JwtPayload;
