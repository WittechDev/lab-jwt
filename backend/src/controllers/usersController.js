const { sequelize } = require("../config/database");
const Argon2 = require("@node-rs/argon2");

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
    return {
      accessToken: "xxxxxxxx.xxxxxxxx", // TODO: jwt return accesstoken
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
    `INSERT INTO public.user (username, email, password, "createdAt", "updatedAt") VALUES (:username, :email, :password, :createdAt, :updatedAt)`,
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

const getUsers = async () => {
  const [results] = await sequelize.query(
    `SELECT id, username, email, "createdAt", "updatedAt" FROM public.user ORDER BY id ASC`
  );
  return results;
};

const getUserById = async (id) => {
  try {
    const [results] = await sequelize.query(
      "SELECT * FROM public.user WHERE id = :id",
      { replacements: { id } }
    );
    return results[0];
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, { name }) => {
  try {
    sequelize.query("UPDATE public.user SET name = :name, WHERE id = :id", {
      replacements: { id, name },
    });
    return id;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    sequelize.query("DELETE FROM public.user WHERE id = :1", {
      replacements: { id },
    });
    return id;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
