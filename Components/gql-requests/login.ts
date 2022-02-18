import apolloClient from '../../utils/apolloClient';
import { gql } from '@apollo/client';

export type LoginRequestParams = { username: string; password: string };

export default async ({ username, password }: LoginRequestParams) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      mutation($user: AccountInput!) {
        login(accountInput: $user)
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
