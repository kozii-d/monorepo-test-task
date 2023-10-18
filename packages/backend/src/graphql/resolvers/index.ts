import createUser from "./mutation/createUser";
import user from "./query/user";

export const resolvers = {
  Query: {
    user
  },
  Mutation: {
    createUser
  }
};