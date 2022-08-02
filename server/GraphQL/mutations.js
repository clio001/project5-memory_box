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
				const existingUser: dbModel.User = await User.findOne({
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

		// * DELETE USER

		deleteUser: {
			type: UserType,
			args: {
				id: { type: GraphQLString },
			},
			async resolve(parent, args, context) {
				if (!context.user) return null;
				return await User.findByIdAndDelete(args.id);
			},
		},

		// * ADD NEW ITEM
		addItem: {
			type: ItemType,
			args: {
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				createdBy: { type: GraphQLString },
				user_id: { type: GraphQLString },
				type: { type: GraphQLString },
				file_url: { type: GraphQLString },
				share: { type: GraphQLBoolean },
			},
			// const item : Item= {
			//   title,
			// }
			async resolve(parent, args, context) {
				if (!context.user) return null;
				let newItem = new Item < dbModel.Item > ({
					title: args.title,
					description: args.description,
					createdBy: args.createdBy,
					user_id: args.user_id,
					type: args.type,
					file_url: args.file_url,
					share: args.share,
				});
				return await newItem.save();
			},
		},

		// * UPDATE ITEM
		updateItem: {
			type: ItemType,
			args: {
				id: { type: GraphQLID },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				type: { type: GraphQLString },
				file_url: { type: GraphQLString },
				share: { type: GraphQLBoolean },
			},
			async resolve(parent, args, context) {
				if (!context.user) return null;
				return await Item.findByIdAndUpdate(args.id, {
					title: args.title,
					description: args.description,
					type: args.type,
					file_url: args.file_url,
					share: args.share,
				});
			},
		},

		// * DELETE ITEM

		deleteItem: {
			type: ItemType,
			args: {
				id: { type: GraphQLString },
			},
			async resolve(parent, args, context) {
				if (!context.user) return null;
				return await Item.findByIdAndDelete(args.id);
			},
		},
	},
});

export { Mutation };