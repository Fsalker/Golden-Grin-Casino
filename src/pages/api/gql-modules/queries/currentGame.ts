import { jwtInvalidErrorMessage, JwtPayload } from "../types";
import { AuthenticationError } from "apollo-server-micro";
import { isCardValueAce } from "../../../../utils/isCardValueAce";
import { GameStateType } from "../../../../components/types";
import { getUserLatestGame, isGameWon } from "../common";

export default async (_: any, __: any, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(jwtInvalidErrorMessage);
  }

  const game = await getUserLatestGame(userId);
  if (!game) {
    return null;
  }

  const numCardsInDeck = game.deck.length;
  const gameWon = isGameWon(game);

  const cardsLeft = game.deck.length - game.currentCardIndex;
  const acesLeft = game.deck
    .slice(game.currentCardIndex)
    .filter((cardValue) =>
      isCardValueAce({ cardValue, numCardsInDeck })
    ).length;
  const gameState: GameStateType =
    cardsLeft > 0 ? "in progress" : gameWon ? "won" : "lost";

  return {
    gameState,
    cardsLeft,
    acesLeft,
  };
};
