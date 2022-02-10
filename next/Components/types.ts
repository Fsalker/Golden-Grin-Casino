import { FunctionComponent } from 'react';

export type SmallButtonType = FunctionComponent;
export type LargeButtonType = FunctionComponent;
export type ButtonComponent = SmallButtonType | LargeButtonType;

export enum CardSymbols {
  '♣' = '♣',
  '♦' = '♦',
  '♥' = '♥',
  '♠' = '♠',
}

export type CardParams = {
  cardNumber: string;
  cardSymbol: CardSymbols;
  cardIndex: number;
  canRotateCards: boolean;
};
