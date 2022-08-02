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
		// * ADD NEW USER
		addUser: {
			type: UserType,
			args: {
				//   firstName: { type: GraphQLString },
				//   lastName: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			async resolve(parent, args) {
				let newUser = new User({
					//  firstName: args.firstName,
					//  lastName: args.lastName,
					email: args.email,
					password: args.password,
				});
				return await newUser.save();
			},
		},
		// * UPDATE USER INFO
		updateUser: {
			type: UserType,
			args: {
				id: { type: GraphQLID },
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
				avatar_url: { type: GraphQLString },
				banner_url: { type: GraphQLString },
				// location: { type: GraphQLString },
			},
			async resolve(parent, args) {
				return await User.findByIdAndUpdate(args.id, {
					firstName: args.firstName,
					lastName: args.lastName,
					email: args.email,
					password: args.password,
					avatar_url: args.avatar_url,
					banner_url: args.banner_url,
					// location: args.location,
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
