import { FunctionComponent } from 'react';

export type SmallButtonType = FunctionComponent;
export type LargeButtonType = FunctionComponent;
export type ButtonComponent = SmallButtonType | LargeButtonType;

export type CardSymbols = '♣' | '♦' | '♥' | '♠';
export type GameStateType = null | 'in progress' | 'won' | 'lost';
export type AccountFormStateType = 'invisible' | 'logging in' | 'registering';
