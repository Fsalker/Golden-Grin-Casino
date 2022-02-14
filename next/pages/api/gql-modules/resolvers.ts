import prisma from '../../../prisma/prismaClient';
import { generateJwt } from './auth';
import bcrypt from 'bcrypt';
import { CurrentGameParams, JwtPayload, LoginParams, RegisterParams } from './types';
import { AuthenticationError } from 'apollo-server-micro';
import { generateDeck } from '../../../utils/generateDeck';
import { isCardValueAce } from '../../../utils/isCardValueAce';
import { GameStateType } from '../../../Components/types';

const bcryptSaltRounds = 12;

const currentGame = async (_: any, __: any, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(
      "You must authenticate using a *valid* JWT in the 'authorization' request header, after logging in."
    );
  }

  const game = await prisma.game.findFirst({ where: { userId } });
  if (!game) {
    return null;
  }

  const numCardsInDeck = game.deck.length;
  const lastDrawnCards = game.deck.slice(-(game.deck.length % 5));
  const gameWon = !!lastDrawnCards.find((cardValue) =>
    isCardValueAce({ cardValue, numCardsInDeck })
  );

  const cardsLeft = game.deck.length - game.currentCardIndex;
  const acesLeft = game.deck.filter((cardValue) => isCardValueAce({ cardValue, numCardsInDeck }))
    .length;
  const gameState: GameStateType = cardsLeft > 0 ? 'in progress' : gameWon ? 'won' : 'lost';

  return {
    gameState,
    cardsLeft,
    acesLeft,
  };
};

const login = async (_: any, { accountInput: { username, password } }: LoginParams) => {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    throw Error('Authentication failed');
  }

  const storedPassword = user.password;
  const passwordIsCorrect = await bcrypt.compare(password, storedPassword);

  if (passwordIsCorrect) {
    const jwt = generateJwt({ userId: user.id });
    return jwt;
  } else {
    throw Error('Authentication failed');
  }
};

const register = async (_: any, { accountInput: { username, password } }: RegisterParams) => {
  const userWithSameUsername = await prisma.user.findUnique({ where: { username } });
  if (userWithSameUsername) {
    throw Error('Username is already taken.');
  }

  const storedPassword = await bcrypt.hash(password, bcryptSaltRounds);
  const user = await prisma.user.create({ data: { username, password: storedPassword } });
  const jwt = generateJwt({ userId: user.id });

  return jwt;
};

const startGame = async (_: any, { numCardsInDeck }: CurrentGameParams, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(
      "You must authenticate using a *valid* JWT in the 'authorization' request header, after logging in."
    );
  }

  const deck = generateDeck(numCardsInDeck);
  await prisma.game.create({
    data: {
      deck,
      user: {
        connect: { id: userId },
      },
    },
  });

  console.log(deck);

  return true;
};

const dealCards = async (_: any, __: any, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(
      "You must authenticate using a *valid* JWT in the 'authorization' request header, after logging in."
    );
  }

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
    dealCards,
  },
};
