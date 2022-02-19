import prisma from "../../../../prisma/prismaClient";
import { isCardValueAce } from "../../../utils/isCardValueAce";
import { Game } from "@prisma/client";

export const bcryptSaltRounds = 12;

// Note: this function will only be used on games that are 100% closed / finished (ie: using it in query "currentGame" won't work)
export const isGameAbandoned = (game: Game) =>
  game.abandoned || game.currentCardIndex !== game.deck.length;

export const isGameWon = (game: Game) => {
  if (isGameAbandoned(game)) {
    // Abandoned games will be considered lost
    return false;
  }

  const numCardsInDeck = game.deck.length;
  const lastDrawnCards = game.deck.slice(-(game.deck.length % 5) || -5); // Take the last [1, 2, 3, 4, 5] cards
  const gameWon = !!lastDrawnCards.filter((cardValue: number) =>
    isCardValueAce({ cardValue, numCardsInDeck })
  ).length;

  return gameWon;
};

export const getUserLatestGame = async (userId: number) => {
  const game = (
    await prisma.game.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 1,
    })
  )?.[0];

  return game;
};
