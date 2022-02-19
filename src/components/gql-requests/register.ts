import apolloClient from "../../utils/apolloClient";
import { mutationRegister } from "./gql-queries";

export type RegisterRequestParams = { username: string; password: string };

export default async ({ username, password }: RegisterRequestParams) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: mutationRegister,
    variables: {
      user: {
        username,
        password,
      },
    },
  });

  return { data, errors };
};
