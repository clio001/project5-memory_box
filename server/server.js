import express from "express";
import * as dotenv from "dotenv";
import usersRoute from "./routes/usersRoute.js";
import itemsRoute from "./routes/itemsRoute.js";
import cors from "cors";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { schema } from "./GraphQL/schema.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

const runServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const loadRoutes = () => {
  app.use("/test", (req, res) => {
    res.status(200).json({ msg: "Endpoint reached at '/'" });
  });
  app.use("/users", usersRoute);
  app.use("/items", itemsRoute);
};

const addMiddleware = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors(corsOptions));
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connection to Memory Box database established.");
  } catch (error) {
    console.log("Error trying to connect with Memory Box database", error);
  }
};

const runApolloServer = () => {
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
  });

  server.listen().then(({ url }) => {
    console.log(`Apollo server running at ${url}`);
  });
};

(async () => {
  connectToMongoDB();
  addMiddleware();
  loadRoutes();
  runServer();
  runApolloServer();
})();
