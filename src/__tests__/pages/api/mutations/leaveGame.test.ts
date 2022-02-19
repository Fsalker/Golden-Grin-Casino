import { mutationLeaveGame } from "../../../../components/gql-requests/gql-queries";
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
    query: mutationLeaveGame,
  });
  expect(errors?.[0]?.message).toEqual(jwtInvalidErrorMessage);
});

it("Should leave the most recent game", async () => {
  prismaMock.game.findMany.mockReturnValueOnce([mockedNewGame]);
  prismaMock.game.update.mockReset();
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationLeaveGame,
  });

  expect(data?.leaveGame).toEqual(true);
});
