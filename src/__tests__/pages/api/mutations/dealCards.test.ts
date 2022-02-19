import { mutationDealCards } from "../../../../components/gql-requests/gql-queries";
import { jwtInvalidErrorMessage } from "../../../../pages/api/gql-modules/types";
import { prismaMock } from "../../../../../prisma/prismaClientMocked";
import { ApolloServerBase } from "apollo-server-core";
import {
  mockedNewGame,
  mockedFinishedGame,
  mockedAbandonedGame,
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
    query: mutationDealCards,
  });
  expect(errors?.[0]?.message).toEqual(jwtInvalidErrorMessage);
});

it("Should return 'null' when we cannot deal cards (finished game)", async () => {
  prismaMock.game.findMany.mockResolvedValueOnce([mockedFinishedGame]);
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationDealCards,
  });

  expect(data).toEqual({ dealCards: null });
});

it("Should return 'null' when we cannot deal cards (no games)", async () => {
  prismaMock.game.findMany.mockResolvedValueOnce([]);
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationDealCards,
  });

  expect(data).toEqual({ dealCards: null });
});

it("Should return 'null' when we cannot deal cards (abandoned game)", async () => {
  prismaMock.game.findMany.mockResolvedValueOnce([mockedAbandonedGame]);
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationDealCards,
  });

  expect(data).toEqual({ dealCards: null });
});

it("Should return an array of cards", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([mockedNewGame]);
  prismaMock.game.update.mockReset();
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationDealCards,
  });

  expect(data?.dealCards).toEqual(expect.any(Array));
  expect(data!.dealCards.length).toEqual(5);
});
