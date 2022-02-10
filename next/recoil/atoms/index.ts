import { atom } from 'recoil';

export const offlineGameState = atom({
  key: 'offlineGameState',
  default: true,
});

export const loggedInState = atom({
  key: 'loggedInState',
  default: null as null | boolean,
});

export const gameInProgressState = atom({
  key: 'gameInProgressState',
  default: false,
});

export const numCardsInDeckState = atom({
  // TODO: Allow setting a different number of cards per suit (ie: 13, 14, 15 or 12, 11, 10 etc)
  key: 'numCardsInDeckState',
  default: 52,
});

export const cardsLeftState = atom({
  key: 'cardsLeftState',
  default: 52,
});

export const acesLeftState = atom({
  key: 'acesLeftState',
  default: 4,
});

export const cardsDrawnState = atom({
  key: 'cardsDrawnState',
  default: [] as Array<number>,
});

export const deckValuesState = atom({
  key: 'deckValues',
  default: [] as Array<number>,
});
