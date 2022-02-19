import { jwtInvalidErrorMessage } from "../../../../pages/api/gql-modules/types";
import { prismaMock } from "../../../../../prisma/prismaClientMocked";
import { ApolloServerBase } from "apollo-server-core";
import {
  mockedAbandonedGame,
  mockedLostGame,
  mockedNewGame,
  mockedWonGame,
} from "../../../../__mocks__";
import { gql } from "@apollo/client";

let testApolloServer: ApolloServerBase,
  testAuthenticatedApolloServer: ApolloServerBase;

const queryCurrentGame = gql`
  query {
    currentGame {
      gameState
      cardsLeft
      acesLeft
    }
  }
`;

beforeAll(() => {
  ({
    testApolloServer,
    testAuthenticatedApolloServer,
  } = require("../../../../pages/api/graphql"));
});

it("Should throw auth error when userId doesn't exist in the context", async () => {
  const { errors } = await testApolloServer.executeOperation({
    query: queryCurrentGame,
  });
  expect(errors?.[0]?.message).toEqual(jwtInvalidErrorMessage);
});

it("Should return 'null' if no games have been played", async () => {
  prismaMock.game.update.mockReset();
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryCurrentGame,
  });
  expect(data?.currentGame).toEqual(null);
});

it("Should get the most recent game (in progress)", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([mockedNewGame]);
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryCurrentGame,
  });

  expect(data?.currentGame?.gameState).toEqual("in progress");
  expect(data?.currentGame?.cardsLeft).toEqual(mockedNewGame.deck.length);
  expect(data?.currentGame?.acesLeft).toEqual(4);
});

it("Should get the most recent game (won)", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([mockedWonGame]);
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryCurrentGame,
  });

  expect(data?.currentGame?.gameState).toEqual("won");
  expect(data?.currentGame?.cardsLeft).toEqual(0);
  expect(data?.currentGame?.acesLeft).toEqual(0);
});

it("Should get the most recent game (abandoned)", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([mockedAbandonedGame]);
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryCurrentGame,
  });

  expect(data?.currentGame?.gameState).toEqual("lost");
  expect(data?.currentGame?.cardsLeft).toEqual(mockedNewGame.deck.length);
  expect(data?.currentGame?.acesLeft).toEqual(4);
});

it("Should get the most recent game (lost)", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([mockedLostGame]);
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryCurrentGame,
  });

  expect(data?.currentGame?.gameState).toEqual("lost");
  expect(data?.currentGame?.cardsLeft).toEqual(0);
  expect(data?.currentGame?.acesLeft).toEqual(0);
});
