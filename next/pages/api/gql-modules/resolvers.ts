import prisma from '../../../prisma/prismaClient';
import { generateJwt } from './auth';
import bcrypt from 'bcrypt';
import { CurrentGameParams, JwtPayload, LoginParams, RegisterParams } from './types';
import { AuthenticationError } from 'apollo-server-micro';

const bcryptSaltRounds = 12;

const currentGame = (_: any, __: any, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(
      "You must authenticate using a *valid* JWT in the 'authorization' request header, after logging in."
    );
  }

  return {
    gameState: 'in progress',
    cardsLeft: 30,
    acesLeft: 3,
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

const startGame = (_: any, { numCardsInDeck }: CurrentGameParams, { userId }: JwtPayload) => {
  if (!userId) {
    throw new AuthenticationError(
      "You must authenticate using a *valid* JWT in the 'authorization' request header, after logging in."
    );
  }
  return true;
};

const drawCards = (_: any, __: any, { userId }: JwtPayload) => {
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
    drawCards,
  },
};
