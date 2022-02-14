import { JwtPayload } from '../types';
import { AuthenticationError } from 'apollo-server-micro';
import { isCardValueAce } from '../../../../utils/isCardValueAce';
import { GameStateType } from '../../../../Components/types';
import { getUserLatestGame } from '../common';

export default async (_: any, __: any, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(
      "You must authenticate using a *valid* JWT in the 'authorization' request header, after logging in."
    );
  }

  const game = await getUserLatestGame(userId);
  if (!game) {
    return null;
  }

  const numCardsInDeck = game.deck.length;
  const lastDrawnCards = game.deck.slice(-(game.deck.length % 5));
  const gameWon = !!lastDrawnCards.filter((cardValue) =>
    isCardValueAce({ cardValue, numCardsInDeck })
  ).length;

  const cardsLeft = game.deck.length - game.currentCardIndex;
  const acesLeft = game.deck
    .slice(game.currentCardIndex)
    .filter((cardValue) => isCardValueAce({ cardValue, numCardsInDeck })).length;
  const gameState: GameStateType = cardsLeft > 0 ? 'in progress' : gameWon ? 'won' : 'lost';

  return {
    gameState,
    cardsLeft,
    acesLeft,
  };
};
