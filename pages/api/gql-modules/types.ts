export type JwtPayload = {
  userId: number;
};

export type LoginParams = {
  accountInput: {
    username: string;
    password: string;
  };
};
export type RegisterParams = LoginParams;
export type CurrentGameParams = {
  numCardsInDeck: number;
};
export type AccountHistoryParams = {
  spanMinutes: number;
};

export const usernameTakenErrorMessage = 'Your username is already taken.';
export const authenticationFailedErrorMessage = 'Authentication failed.';
