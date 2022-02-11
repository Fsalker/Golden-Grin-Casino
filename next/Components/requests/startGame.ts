import { SetterOrUpdater } from 'recoil';
import { generateDeck } from '../../utils/generateDeck';
import { GameStateType } from '../types';

export type StartGameParams = {
  setGameInProgress: SetterOrUpdater<boolean>;
  setCardsLeft: SetterOrUpdater<number>;
  setDrawnCards: SetterOrUpdater<Array<number>>;
  offlineGame: boolean;
  setDeckValues: SetterOrUpdater<Array<number>>;
  numCardsInDeck: number;
  setAcesLeft: SetterOrUpdater<number>;
  setGameState: SetterOrUpdater<GameStateType>;
};

export const startGame = ({
  setGameInProgress,
  setDrawnCards,
  setCardsLeft,
  offlineGame,
  setDeckValues,
  numCardsInDeck,
  setAcesLeft,
  setGameState,
}: StartGameParams) => {
  setGameInProgress(true);
  setDrawnCards([]);
  if (offlineGame) {
    const deck = generateDeck(numCardsInDeck);
    setDeckValues(deck);
    setCardsLeft(numCardsInDeck);
    setAcesLeft(4);
    setGameState('in progress');
  }
  // localStorage.setItem('gameInProgress', 'true');
};
