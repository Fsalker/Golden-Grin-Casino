import prisma from '../../../prisma/prismaClient';
import { isCardValueAce } from '../../../utils/isCardValueAce';
import { Game } from '../../../prisma/generated/prisma-client-js/index';

export const bcryptSaltRounds = 12;

export const isGameAbandoned = (game: Game) => game.currentCardIndex !== game.deck.length;

export const isGameWon = (game: Game) => {
  if (isGameAbandoned(game)) {
    // Abandoned games will be considered lost
    return false;
  }

  const numCardsInDeck = game.deck.length;
  const lastDrawnCards = game.deck.slice(-(game.deck.length % 5));
  const gameWon = !!lastDrawnCards.filter((cardValue: number) =>
    isCardValueAce({ cardValue, numCardsInDeck })
  ).length;

  return gameWon;
};

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
