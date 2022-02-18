import { SetterOrUpdater } from "recoil";
import { generateDeck } from "../../utils/generateDeck";
import { GameStateType } from "../types";
import startGameRequest from "../gql-requests/startGame";

export type StartGameParams = {
  setCardsLeft: SetterOrUpdater<number>;
  setDrawnCards: SetterOrUpdater<Array<number>>;
  loggedIn: null | boolean;
  setDeckValues: SetterOrUpdater<Array<number>>;
  numCardsInDeck: number;
  setAcesLeft: SetterOrUpdater<number>;
  setGameState: SetterOrUpdater<GameStateType>;
};

export const startGame = async ({
  setDrawnCards,
  setCardsLeft,
  loggedIn,
  setDeckValues,
  numCardsInDeck,
  setAcesLeft,
  setGameState,
}: StartGameParams) => {
  setDrawnCards([]);
  if (!loggedIn) {
    const deck = generateDeck(numCardsInDeck);
    setDeckValues(deck);
  } else {
    await startGameRequest({ numCardsInDeck });
  }
  setCardsLeft(numCardsInDeck);
  setAcesLeft(4);
  setGameState("in progress");
};
