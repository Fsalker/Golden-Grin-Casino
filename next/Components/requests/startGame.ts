import { SetterOrUpdater } from 'recoil';
import { generateDeck } from '../../utils/generateDeck';

export type StartGameParams = {
  setGameInProgress: SetterOrUpdater<boolean>;
  setCardsLeft: SetterOrUpdater<number>;
  setDrawnCards: SetterOrUpdater<Array<number>>;
  offlineGame: boolean;
  setDeckValues: SetterOrUpdater<Array<number>>;
  numCardsInDeck: number;
  setAcesLeft: SetterOrUpdater<number>;
};

export const startGame = ({
  setGameInProgress,
  setDrawnCards,
  setCardsLeft,
  offlineGame,
  setDeckValues,
  numCardsInDeck,
  setAcesLeft,
}: StartGameParams) => {
  setGameInProgress(true);
  setDrawnCards([]);
  if (offlineGame) {
    const deck = generateDeck(numCardsInDeck);
    setDeckValues(deck);
    setCardsLeft(numCardsInDeck);
    setAcesLeft(4);
  }
  // localStorage.setItem('gameInProgress', 'true');
};
