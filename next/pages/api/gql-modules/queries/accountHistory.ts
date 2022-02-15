import { AccountHistoryParams, JwtPayload } from '../types';
import { AuthenticationError } from 'apollo-server-micro';
import prisma from '../../../../prisma/prismaClient';
import { isGameWon } from '../common';
import { Game } from '../../../../prisma/generated/prisma-client-js';

const getGameSpreeCount = (games: Game[]) => {
  if (games.length === 0) {
    return 0;
  }

  const isFirstGameInProgress = games[0].currentCardIndex < games[0].deck.length;
  const startIndex = isFirstGameInProgress ? 1 : 0;

  if (startIndex >= games.length) {
    return 0;
  }

  const firstGameWon = isGameWon(games[startIndex]);
  let spree = 1;
  let index = startIndex + 1;
  while (index < games.length && isGameWon(games[index]) === firstGameWon) {
    ++spree;
    ++index;
  }

  return firstGameWon ? spree : -spree;
};

export default async (_: any, { spanMinutes }: AccountHistoryParams, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(
      "You must authenticate using a *valid* JWT in the 'authorization' request header, after logging in."
    );
  }

  const lowestAcceptedCreatedAt = new Date(new Date().getTime() - 1000 * 60 * spanMinutes);
  const games = await prisma.game.findMany({
    where: {
      userId,
      createdAt: {
        gte: lowestAcceptedCreatedAt,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const gameSpreeCount = getGameSpreeCount(games);
  const gamesPlayed = games.length;
  const winningStreak = gameSpreeCount >= 0 ? gameSpreeCount : 0;
  const losingStreak = gameSpreeCount <= 0 ? -gameSpreeCount : 0;

  return {
    gamesPlayed,
    winningStreak,
    losingStreak,
  };
};
