import apolloClient from '../../utils/apolloClient';
import { gql } from '@apollo/client';

type accountHistoryRequestParams = {
  spanMinutes: number;
};

export default async ({ spanMinutes }: accountHistoryRequestParams) => {
  const { data, errors } = await apolloClient.mutate({
    mutation: gql`
      query($spanMinutes: Int!) {
        accountHistory(spanMinutes: $spanMinutes) {
          gamesPlayed
          winningStreak
          losingStreak
        }
      }
    `,
    variables: {
      spanMinutes,
    },
  });

  return { data, errors };
};
