import { jwtInvalidErrorMessage, JwtPayload } from "../types";
import { AuthenticationError } from "apollo-server-micro";
import prisma from "../../../../../prisma/prismaClient";
import { getUserLatestGame } from "../common";

export default async (_: any, __: any, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(jwtInvalidErrorMessage);
  }

  const game = await getUserLatestGame(userId);
  if (!game || game.abandoned || game.currentCardIndex >= game.deck.length) {
    return null;
  }

  const numDrawnCards = Math.min(5, game.deck.length - game.currentCardIndex);
  const newCurrentCardIndex = game.currentCardIndex + numDrawnCards;
  const drawnCards = game.deck.slice(
    game.currentCardIndex,
    game.currentCardIndex + numDrawnCards
  );

  await prisma.game.update({
    where: {
      id: game.id,
    },
    data: {
      currentCardIndex: newCurrentCardIndex,
    },
  });

  return drawnCards;
};
