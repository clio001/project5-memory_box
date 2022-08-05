import express from "express";
import * as dotenv from "dotenv";
import usersRoute from "./routes/usersRoute.js";
import itemsRoute from "./routes/itemsRoute.js";
import commentsRoute from "./routes/commentsRoute.js";
import uploadsRoute from "./routes/uploadsRoute.js";
import cors from "cors";
import mongoose from "mongoose";
import { schema } from "./GraphQL/schema.js";
import { getUser } from "./getUser.js";
import { ApolloServer, gql } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import http from "http";

import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { cloudinaryConfig } from "./config/cloudinaryConfig.js";

// TODO: https://www.apollographql.com/docs/react/get-started

dotenv.config({ path: "./.env" });

const app = express();

const PORT = process.env.PORT || 5001;

const runServer = () => {
  app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`);
  });
};

const loadRoutes = () => {
  app.use("/test", (req, res) => {
    res.status(200).json({ msg: "Endpoint reached at '/'" });
  });
  app.use("/users", usersRoute);
  app.use("/items", itemsRoute);
  app.use("/comments", commentsRoute);
  app.use("/uploads", uploadsRoute);
};

const addMiddleware = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors(corsOptions));
  cloudinaryConfig();
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to Memory Box database established.");
  } catch (error) {
    console.log("Error trying to connect with Memory Box database", error);
  }
};

const runApolloServer = async () => {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    introspection: true,
    cache: "bounded",
    context: async ({ req }) => {
      if (!req.headers.token) {
        return null;
      } else {
        const { token } = req.headers;
        const user = await getUser(token);

        return { user };
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();
  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  /*  server.listen().then(({ url }) => {
    console.log(`Apollo server is running at ${url}`); */
};

(async () => {
  connectToMongoDB();
  addMiddleware();
  loadRoutes();
  runServer();
  runApolloServer();
})();
