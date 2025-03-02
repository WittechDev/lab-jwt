const { sequelize } = require("../config/database");

const getUsers = async () => {
  try {
    const [results] = await sequelize.query(
      "SELECT * FROM public.user ORDER BY id ASC"
    );
    return results;
  } catch (error) {
    throw error;
  }
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

const createUser = async ({ username, password }) => {
  try {
    const [results, meta] = await sequelize.query(
      "INSERT INTO public.user (username, password) VALUES (:username, :password)",
      { replacements: { username, password } }
    );
    return results.insertId;
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

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
