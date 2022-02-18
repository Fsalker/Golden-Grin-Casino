import apolloClient from '../../utils/apolloClient';
import { gql } from '@apollo/client';

export type RegisterRequestParams = { username: string; password: string };

export default async ({ username, password }: RegisterRequestParams) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation($user: AccountInput!) {
        register(accountInput: $user)
      }
    `,
    variables: {
      user: {
        username,
        password,
      },
    },
  });

  return { data, errors };
};
