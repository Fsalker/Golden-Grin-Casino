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
