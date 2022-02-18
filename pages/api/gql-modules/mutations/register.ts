import { RegisterParams, usernameTakenErrorMessage } from "../types";
import prisma from "../../../../prisma/prismaClient";
import bcrypt from "bcrypt";
import { generateJwt } from "../auth";
import { bcryptSaltRounds } from "../common";

export default async (
  _: any,
  { accountInput: { username, password } }: RegisterParams
) => {
  const userWithSameUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (userWithSameUsername) {
    throw Error(usernameTakenErrorMessage);
  }

  const storedPassword = await bcrypt.hash(password, bcryptSaltRounds);
  const user = await prisma.user.create({
    data: { username, password: storedPassword },
  });
  const jwt = generateJwt({ userId: user.id });

  return jwt;
};
