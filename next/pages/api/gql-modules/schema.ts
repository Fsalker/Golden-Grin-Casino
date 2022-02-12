import { gql } from 'apollo-server-micro';

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
  }

  type GamePublicData {
    gameState: String
    cardsLeft: String
    acesLeft: String
  }

  input AccountInput {
    username: String!
    password: String!
  }

  type Query {
    currentGame: GamePublicData
  }

  type Mutation {
    login(accountInput: AccountInput!): String
    register(accountInput: AccountInput!): String
    startGame(numCardsInDeck: Int!): Boolean
    drawCards: [Int]
  }
`;
