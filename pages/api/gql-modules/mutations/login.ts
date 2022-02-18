import { authenticationFailedErrorMessage, LoginParams } from "../types";
import prisma from "../../../../prisma/prismaClient";
import bcrypt from "bcrypt";
import { generateJwt } from "../auth";

export default async (
  _: any,
  { accountInput: { username, password } }: LoginParams
) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw Error(authenticationFailedErrorMessage);
  }

  const storedPassword = user.password;
  const passwordIsCorrect = await bcrypt.compare(password, storedPassword);

  if (passwordIsCorrect) {
    const jwt = generateJwt({ userId: user.id });
    return jwt;
  } else {
    throw Error(authenticationFailedErrorMessage);
  }
};
