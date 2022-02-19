import apolloClient from "../../utils/apolloClient";
import { mutationLogin } from "./gql-queries";

export type LoginRequestParams = { username: string; password: string };

export default async ({ username, password }: LoginRequestParams) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: mutationLogin,
    variables: {
      user: {
        username,
        password,
      },
    },
  });

  return { data, errors };
};
