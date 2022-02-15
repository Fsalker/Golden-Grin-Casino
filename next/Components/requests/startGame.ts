import { SetterOrUpdater } from 'recoil';
import { generateDeck } from '../../utils/generateDeck';
import { GameStateType } from '../types';

export type StartGameParams = {
  setCardsLeft: SetterOrUpdater<number>;
  setDrawnCards: SetterOrUpdater<Array<number>>;
  offlineGame: boolean;
  setDeckValues: SetterOrUpdater<Array<number>>;
  numCardsInDeck: number;
  setAcesLeft: SetterOrUpdater<number>;
  setGameState: SetterOrUpdater<GameStateType>;
};

export const startGame = ({
  setDrawnCards,
  setCardsLeft,
  offlineGame,
  setDeckValues,
  numCardsInDeck,
  setAcesLeft,
  setGameState,
}: StartGameParams) => {
  setDrawnCards([]);
  if (offlineGame) {
    const deck = generateDeck(numCardsInDeck);
    setDeckValues(deck);
    setCardsLeft(numCardsInDeck);
    setAcesLeft(4);
    setGameState('in progress');
  }
};
