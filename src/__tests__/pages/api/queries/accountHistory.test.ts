import { queryAccountHistory } from "../../../../components/gql-requests/gql-queries";
import { jwtInvalidErrorMessage } from "../../../../pages/api/gql-modules/types";
import { prismaMock } from "../../../../../prisma/prismaClientMocked";
import { ApolloServerBase } from "apollo-server-core";
import {
  mockedAbandonedGame,
  mockedLostGame,
  mockedNewGame,
  mockedWonGame,
} from "../../../../__mocks__";

let testApolloServer: ApolloServerBase,
  testAuthenticatedApolloServer: ApolloServerBase;

beforeAll(() => {
  ({
    testApolloServer,
    testAuthenticatedApolloServer,
  } = require("../../../../pages/api/graphql"));
});

it("Should throw auth error when userId doesn't exist in the context", async () => {
  const { errors } = await testApolloServer.executeOperation({
    query: queryAccountHistory,
    variables: { spanMinutes: 5 },
  });
  expect(errors?.[0]?.message).toEqual(jwtInvalidErrorMessage);
});

it("Should return 3 total games + 2 won games (1 game in progress)", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([
    mockedNewGame,
    mockedWonGame,
    mockedWonGame,
  ]);
  prismaMock.game.update.mockReset();
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryAccountHistory,
    variables: { spanMinutes: 5 },
  });
  expect(data?.accountHistory?.gamesPlayed).toEqual(3);
  expect(data?.accountHistory?.winningStreak).toEqual(2);
  expect(data?.accountHistory?.losingStreak).toEqual(0);
});

it("Should return 2 total games + 2 won games", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([mockedWonGame, mockedWonGame]);
  prismaMock.game.update.mockReset();
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryAccountHistory,
    variables: { spanMinutes: 5 },
  });
  expect(data?.accountHistory?.gamesPlayed).toEqual(2);
  expect(data?.accountHistory?.winningStreak).toEqual(2);
  expect(data?.accountHistory?.losingStreak).toEqual(0);
});

it("Should return 5 total games + 3 lost games (1 game in progress)", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([
    mockedNewGame,
    mockedLostGame,
    mockedAbandonedGame,
    mockedLostGame,
    mockedWonGame,
  ]);
  prismaMock.game.update.mockReset();
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryAccountHistory,
    variables: { spanMinutes: 5 },
  });
  expect(data?.accountHistory?.gamesPlayed).toEqual(5);
  expect(data?.accountHistory?.winningStreak).toEqual(0);
  expect(data?.accountHistory?.losingStreak).toEqual(3);
});

it("Should return 4 total games + 3 lost games", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([
    mockedLostGame,
    mockedAbandonedGame,
    mockedLostGame,
    mockedWonGame,
  ]);
  prismaMock.game.update.mockReset();
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: queryAccountHistory,
    variables: { spanMinutes: 5 },
  });
  expect(data?.accountHistory?.gamesPlayed).toEqual(4);
  expect(data?.accountHistory?.winningStreak).toEqual(0);
  expect(data?.accountHistory?.losingStreak).toEqual(3);
});
