import { mutationStartGame } from "../../../../components/gql-requests/gql-queries";
import { jwtInvalidErrorMessage } from "../../../../pages/api/gql-modules/types";
import { prismaMock } from "../../../../../prisma/prismaClientMocked";
import { ApolloServerBase } from "apollo-server-core";
import { mockedNewGame } from "../../../../__mocks__";

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
    query: mutationStartGame,
    variables: { numCardsInDeck: 16 },
  });
  expect(errors?.[0]?.message).toEqual(jwtInvalidErrorMessage);
});

it("Should not start a new game with an invalid amount of cards in the deck (ie: null)", async () => {
  prismaMock.game.create.mockReset();
  const { errors } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationStartGame,
  });
  expect(errors?.length).toBeGreaterThanOrEqual(1);
});

it("Should not start a new game with an invalid amount of cards in the deck (ie: negative)", async () => {
  prismaMock.game.create.mockReset();
  const { errors } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationStartGame,
    variables: { numCardsInDeck: -29 },
  });
  expect(errors?.length).toBeGreaterThanOrEqual(1);
});

it("Should start a new game", async () => {
  prismaMock.game.create.mockReset();
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationStartGame,
    variables: { numCardsInDeck: 16 },
  });
  expect(data?.startGame).toEqual(true);
});
