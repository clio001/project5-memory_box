import express from "express";
import * as dotenv from "dotenv";
import usersRoute from "./routes/usersRoute.js";
import itemsRoute from "./routes/itemsRoute.js";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

const runServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const loadRoutes = () => {
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

(async () => {
  connectToMongoDB();
  addMiddleware();
  loadRoutes();
  runServer();
})();
