import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config({path: "server/.env"});

const createToken = (user_id) => {
  const payload = {
    sub: user_id,
  };

  const signOptions = {
    expiresIn: "1d",
  };

  const jwt = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY, signOptions);

  return jwt;
};

export {createToken};
