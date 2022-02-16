import { JwtPayload } from '../types';
import { AuthenticationError } from 'apollo-server-micro';
import prisma from '../../../../prisma/prismaClient';
import { getUserLatestGame } from '../common';

export default async (_: any, __: any, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(
      "You must authenticate using a *valid* JWT in the 'authorization' request header, after logging in."
    );
  }

  const game = await getUserLatestGame(userId);
  if (game) {
    await prisma.game.update({
      where: {
        id: game.id,
      },
      data: {
        abandoned: true,
      },
    });
  }

  return true;
};
