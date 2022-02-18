import {
  CurrentGameParams,
  jwtInvalidErrorMessage,
  JwtPayload,
} from "../types";
import { AuthenticationError } from "apollo-server-micro";
import { generateDeck } from "../../../../utils/generateDeck";
import prisma from "../../../../prisma/prismaClient";

export default async (
  _: any,
  { numCardsInDeck }: CurrentGameParams,
  { userId }: JwtPayload
) => {
  if (!userId) {
    throw new AuthenticationError(jwtInvalidErrorMessage);
  }

  const deck = generateDeck(numCardsInDeck);
  await prisma.game.create({
    data: {
      deck,
      user: {
        connect: { id: userId },
      },
    },
  });

  return true;
};
