import graphql, {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import _ from "lodash";
import { ItemType, UserType, TokenType } from "./typeDefs.js";
import User from "../models/userModel.js";
import Item from "../models/itemModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.js";

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // * ADD NEW USER
    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(args.password, salt);

        let newUser = new User({
          email: args.email,
          password: hash,
        });
        return await newUser.save();
      },
    },

    // * LOGIN USER
    loginUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args, context) {
        console.log("context: ", context.permission);
        // * 1. verify password using bcrypt compare
        const existingUser = await User.findOne({
          email: args.email,
        });
        if (!existingUser) {
          throw Error(`${args.email} does not exist.`);
        } else {
          const isVerified = await bcrypt.compare(
            args.password,
            existingUser.password
          );
          if (!isVerified) {
            throw Error(`Incorrect password.`);
          } else {
            console.log("Password correct.");
            // * 2. Issue token
            const token = createToken(existingUser.id);
            console.log("Token: ", token);

            return { ...existingUser, token: { token } };
          }
        }
      },
    },

    // * UPDATE USER INFO
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        avatar_url: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await User.findByIdAndUpdate(args.id, {
          firstName: args.firstName,
          lastName: args.lastName,
          avatar_url: args.avatar_url,
          location: args.location,
        });
      },
    },

    // TODO: DELETE USER ACCOUNT

    // * ADD NEW ITEM
    addItem: {
      type: ItemType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdBy: { type: GraphQLString },
        type: { type: GraphQLString },
        file_url: { type: GraphQLString },
        share: { type: GraphQLBoolean },
      },
      // const item : Item= {
      //   title,
      // }
      async resolve(parent, args) {
        let newItem = new Item({
          title: args.title,
          description: args.description,
          createdBy: args.createdBy,
          type: args.type,
          file_url: args.file_url,
          share: args.share,
        });
        return await newItem.save();
      },
    },
  },
});

export { Mutation };
