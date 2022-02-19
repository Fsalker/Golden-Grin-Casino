import { mutationLogin } from "../../../../components/gql-requests/gql-queries";
import { authenticationFailedErrorMessage } from "../../../../pages/api/gql-modules/types";
import { prismaMock } from "../../../../../prisma/prismaClientMocked";
import { ApolloServerBase } from "apollo-server-core";
import bcrypt from "bcrypt";

let testApolloServer: ApolloServerBase,
  testAuthenticatedApolloServer: ApolloServerBase;

beforeAll(() => {
  ({
    testApolloServer,
    testAuthenticatedApolloServer,
  } = require("../../../../pages/api/graphql"));
});

it("Should not login if username is not registered", async () => {
  prismaMock.user.findUnique.mockReturnValueOnce(null);
  const { errors } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationLogin,
    variables: { user },
  });
  expect(errors?.[0]?.message).toEqual(authenticationFailedErrorMessage);
});

it("Should not login with invalid password", async () => {
  prismaMock.user.findUnique.mockReturnValueOnce(user);
  jest.mock("bcrypt");
  bcrypt.compare = async () => false;
  const { errors } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationLogin,
    variables: { user },
  });
  expect(errors?.[0]?.message).toEqual(authenticationFailedErrorMessage);
});

it("Should login and return JWT", async () => {
  prismaMock.user.findUnique.mockReturnValueOnce(user);
  jest.mock("bcrypt");
  bcrypt.compare = async () => true;
  const { data } = await testAuthenticatedApolloServer.executeOperation({
    query: mutationLogin,
    variables: { user },
  });
  expect(data?.login).toEqual(expect.any(String));
});

const user = {
  username: "mocked",
  password: "mocked",
};
