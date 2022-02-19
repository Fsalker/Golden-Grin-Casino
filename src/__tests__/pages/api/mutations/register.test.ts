import { mutationRegister } from "../../../../components/gql-requests/gql-queries";
import { usernameTakenErrorMessage } from "../../../../pages/api/gql-modules/types";
import { prismaMock } from "../../../../../prisma/prismaClientMocked";
import { ApolloServerBase } from "apollo-server-core";

let testApolloServer: ApolloServerBase,
  testAuthenticatedApolloServer: ApolloServerBase;

beforeAll(() => {
  ({
    testApolloServer,
    testAuthenticatedApolloServer,
  } = require("../../../../pages/api/graphql"));
});

it("Should not allow registering the same username twice", async () => {
  prismaMock.user.findUnique.mockReturnValueOnce(true);
  const { errors } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationRegister,
    variables: { user },
  });

  expect(errors?.[0]?.message).toEqual(usernameTakenErrorMessage);
});

it("Should register new account and return JWT", async () => {
  prismaMock.user.create.mockReturnValueOnce({ userId: -553 });
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationRegister,
    variables: { user },
  });

  expect(data?.register).toEqual(expect.any(String));
});

const user = {
  username: "mocked",
  password: "mocked",
};
