import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "./models/userModel.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "../.env" });

const getUser = async (token) => {
  const verified: verified = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_OR_KEY, async function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  const user = await User.findById(verified.sub);

  return user;
};

export { getUser };
