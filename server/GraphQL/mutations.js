import graphql, {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import _ from "lodash";
import { ItemType, UserType } from "./typeDefs.js";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        let newUser = new User({
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password,
        });
        return await newUser.save();
      },
    },
  },
});

export { Mutation };
