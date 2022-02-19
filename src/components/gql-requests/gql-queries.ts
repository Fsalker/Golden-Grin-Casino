import { gql } from "@apollo/client";

export const queryAccountHistory = gql`
  query ($spanMinutes: Int!) {
    accountHistory(spanMinutes: $spanMinutes) {
      gamesPlayed
      winningStreak
      losingStreak
    }
  }
`;

export const mutationDealCards = gql`
  mutation {
    dealCards
  }
`;

export const mutationLeaveGame = gql`
  mutation {
    leaveGame
  }
`;

export const mutationLogin = gql`
  mutation ($user: AccountInput!) {
    login(accountInput: $user)
  }
`;

export const mutationRegister = gql`
  mutation ($user: AccountInput!) {
    register(accountInput: $user)
  }
`;

export const mutationStartGame = gql`
  mutation ($numCardsInDeck: Int!) {
    startGame(numCardsInDeck: $numCardsInDeck)
  }
`;
