import prisma from '../../../prisma/prismaClient';

export const bcryptSaltRounds = 12;

export const getUserLatestGame = async (userId: number) => {
  const game = (
    await prisma.game.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 1,
    })
  )?.[0];

  return game;
};
