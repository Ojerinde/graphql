const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const userData = require("../MOCK_DATA.json"); // Get fake data from https://www.mockaroo.com/
const { UserType } = require("./TypeDefs/UserType");

// Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // This is a function and every logic to return the data we want will be written here. Connecting to the database and doing your find, etc.
        return userData;
      },
    },
    getUserById: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        const user = userData.find((user) => +user.id === +args.id);
        return user;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        console.log(args);
        userData.push({ id: userData.length + 1, ...args });
        return args;
      },
    },
    // UpdateUser: {},
  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
