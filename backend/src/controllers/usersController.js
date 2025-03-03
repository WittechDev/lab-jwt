const { sequelize } = require("../config/database");

const getUsers = async () => {
  const [results] = await sequelize.query(
    `SELECT id, username, email, "createdAt", "updatedAt" FROM public.user ORDER BY id ASC`
  );
  return results;
};

const getUserById = async (id) => {
  const [results] = await sequelize.query(
    `SELECT id, username, email, "createdAt", "updatedAt" FROM public.user WHERE id = :id`,
    { replacements: { id } }
  );
  return results[0];
};

const updateUser = async (id, { name }) => {
  sequelize.query("UPDATE public.user SET name = :name, WHERE id = :id", {
    replacements: { id, name },
  });
  return id;
};

const deleteUser = async (id) => {
  sequelize.query("DELETE FROM public.user WHERE id = :1", {
    replacements: { id },
  });
  return id;
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
