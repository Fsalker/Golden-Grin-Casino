import { atom } from "recoil";
import { AccountFormStateType, GameStateType } from "../../components/types";

export const loggedInState = atom({
  key: "loggedInState",
  default: null as null | boolean,
});

export const numCardsInDeckState = atom({
  key: "numCardsInDeckState",
  default: 52,
});

export const cardsLeftState = atom({
  key: "cardsLeftState",
  default: 52,
});

export const acesLeftState = atom({
  key: "acesLeftState",
  default: 4,
});

export const cardsDrawnState = atom({
  key: "cardsDrawnState",
  default: [] as Array<number>,
});

export const deckValuesState = atom({
  key: "deckValues",
  default: [] as Array<number>,
});

export const gameState = atom({
  key: "gameState",
  default: null as GameStateType,
});

export const accountFormState = atom({
  key: "showAccountFormState",
  default: "invisible" as AccountFormStateType,
});
