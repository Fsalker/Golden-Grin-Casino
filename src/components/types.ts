import { FunctionComponent } from "react";

export type SmallButtonType = FunctionComponent;
export type LargeButtonType<T> = FunctionComponent<T>;
export type ButtonComponent = FunctionComponent;

export type CardSymbols = "♣" | "♦" | "♥" | "♠";
export type GameStateType = null | "in progress" | "won" | "lost";
export type AccountFormStateType = "invisible" | "logging in" | "registering";

// export type Cardzzz = String; // <-- for testing TypeScript commit pipeline
