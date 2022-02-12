import prisma from '../../../prisma/prismaClient';
import { generateJwt } from './auth';

type LoginParams = {
  accountInput: {
    username: string;
    password: string;
  };
};

type RegisterParams = LoginParams;

const currentGame = () => {
  return {
    gameState: 'in progress',
    cardsLeft: 30,
    acesLeft: 3,
  };
};

const login = async (_: any, { accountInput: { username, password } }: RegisterParams) => {
  const storedPassword = password; // TODO: hash using bcrypt
  const user = await prisma.user.findFirst({ where: { username, password: storedPassword } });

  if (user) {
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

  const storedPassword = password; // TODO: hash using bcrypt
  const user = await prisma.user.create({ data: { username, password: storedPassword } });
  const jwt = generateJwt({ userId: user.id });

  return jwt;
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
