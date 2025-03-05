const axios = require("axios");
const { sequelize } = require("../config/database");
const Argon2 = require("@node-rs/argon2");
const {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} = require("../utils/jwtGenerator");

const ARGON2_CONFIG = {
  memoryCost: 4096,
  timeCost: 3,
  outputLen: 32,
  parallelism: 1,
  algorithm: Argon2.Algorithm.Argon2id,
  version: Argon2.Version.V0x13,
};

const login = async ({ email, password }) => {
  const [results] = await sequelize.query(
    "SELECT * FROM public.user WHERE email = :email",
    { replacements: { email } }
  );
  const user = results[0];
  if (!user) {
    throw { code: 404, message: "user not found" };
  }

  const isValid = await Argon2.verify(user.password, password, ARGON2_CONFIG);
  if (isValid) {
    const access_token = jwtAccessTokenGenerate(user);
    const refresh_token = jwtRefreshTokenGenerate(user);
    return {
      access_token,
      refresh_token,
    };
  } else {
    throw { code: 401, message: "unauthorization" };
  }
};

const register = async ({ username, email, password }) => {
  const [results] = await sequelize.query(
    "SELECT * FROM public.user WHERE email = :email",
    { replacements: { email } }
  );
  const user = results[0];
  if (user) {
    throw { code: 400, message: "E-mail already in use." };
  }

  const encypedPassword = await Argon2.hash(password, ARGON2_CONFIG);
  await sequelize.query(
    `
      INSERT INTO public.user (username, email, password, "createdAt", "updatedAt") 
      VALUES (:username, :email, :password, :createdAt, :updatedAt)
    `,
    {
      replacements: {
        username,
        email,
        password: encypedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  );
  return "successful";
};

const googleAuth = async ({ token }) => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  const user = response.data;
  const [results] = await sequelize.query(
    "SELECT * FROM public.user WHERE email = :email",
    { replacements: { email: user.email } }
  );
  const dbUser = results[0];
  if (dbUser) {
    const access_token = jwtAccessTokenGenerate(user);
    const refresh_token = jwtRefreshTokenGenerate(user);
    return {
      access_token,
      refresh_token,
    };
  } else {
    throw { code: 401, message: "unauthorized" };
  }
};

module.exports = {
  login,
  register,
  googleAuth,
};
