const currentGame = () => {
  return {
    gameState: 'in progress',
    cardsLeft: 30,
    acesLeft: 3,
  };
};
const login = () => {
  return '<Logged in JWT>';
};

const register = () => {
  return '<Logged in JWT>';
};

const startGame = () => {
  return true;
};

const drawCards = () => {
  return [600, 601, 602, 603, 604];
};

export const resolvers = {
  Query: {
    currentGame,
  },
  Mutation: {
    login,
    register,
    startGame,
    drawCards,
  },
};
