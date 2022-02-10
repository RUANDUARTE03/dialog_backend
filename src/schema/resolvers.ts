import Data from "../data";
import SearchLogic from "../utils/search";

const resolvers = {
  Query: {
    users(parent: any, args: any) {
      var getAllUsers;

      var search = args.search;
      if (search) {
        var findSearch = SearchLogic({
          search: search,
          data: Data,
        });

        getAllUsers = findSearch;
      } else {
        getAllUsers = Data;
      }

      if (getAllUsers) {
        return getAllUsers;
      } else {
        throw new Error("Erro ao buscar usuários, tente novamente!");
      }
    },

    user(parent: any, args: any) {
      var getUserById = Data.find((user: any) => user._id === args.id);

      if (getUserById) {
        return getUserById;
      } else {
        throw new Error("Erro ao buscar usuário, tente novamente!");
      }
    },
  },
};

export default resolvers;
