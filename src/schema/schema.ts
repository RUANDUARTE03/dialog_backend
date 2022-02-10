import { gql } from "apollo-server-express";

const schema = gql`
  type Query {
    users(search: String): [User]
    user(id: ID!, search: String): UserFindById
  }

  type User {
    _id: String!
    name: String!
    email: String!
    company: String!
    eyeColor: String!
    age: Int!
    picture: String!
  }

  type UserFindById {
    _id: String!
    name: String!
    email: String!
    age: Int!
    picture: String!
    friends: [User]
  }
`;

export default schema;
