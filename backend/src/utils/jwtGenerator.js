const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_EXPIRES = "3m";
const REFRESH_EXPIRES = "1d";
const JWT_ALGO = "HS256";

const jwtAccessTokenGenerate = (user = {}) => {
  const { id, username, email } = user;
  const accessToken = jwt.sign({ id, username, email }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_EXPIRES,
    algorithm: JWT_ALGO,
  });

  return accessToken;
};

const jwtRefreshTokenGenerate = (user = []) => {
  const { id, username, email } = user;
  const refreshToken = jwt.sign({ id, username, email }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_EXPIRES,
    algorithm: JWT_ALGO,
  });

  return refreshToken;
};

module.exports = { jwtAccessTokenGenerate, jwtRefreshTokenGenerate };
