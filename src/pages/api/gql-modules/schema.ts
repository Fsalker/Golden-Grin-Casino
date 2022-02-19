import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  enum GameStates {
    in
    progress
    won
    lost
  }

  type Game {
    id: ID!
    user: User!

    deck: [Int]!
    currentCardIndex: Int!
    abandoned: Boolean!
  }

  type GamePublicData {
    gameState: String
    cardsLeft: Int
    acesLeft: Int
  }

  type AccountHistory {
    gamesPlayed: Int
    winningStreak: Int
    losingStreak: Int
  }

  input AccountInput {
    username: String!
    password: String!
  }

  type Query {
    currentGame: GamePublicData
    accountHistory(spanMinutes: Int!): AccountHistory
  }

  type Mutation {
    login(accountInput: AccountInput!): String
    register(accountInput: AccountInput!): String
    startGame(numCardsInDeck: Int!): Boolean
    dealCards: [Int]
    leaveGame: Boolean
  }
`;
