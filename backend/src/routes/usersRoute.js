const express = require("express");
const userController = require("../controllers/usersController");
const helper = require("../utils/helper");

const router = express.Router();

const getUsers = async (request, response, next) => {
  const result = await userController.getUsers();
  helper.response({ data: result, next });
};

const getUserById = async (request, response, next) => {
  const id = parseInt(request.params.id);
  const result = await userController.getUserById(id);
  helper.response({ data: result, next });
};

const updateUser = async (request, response, next) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;
  await userController.updateUser(id, { name, email });
  helper.response({ data: `User modified with ID: ${id}`, next });
};

const deleteUser = async (request, response, next) => {
  const id = parseInt(request.params.id);
  await userController.deleteUser(id);
  helper.response({ data: `User deleted with ID: ${id}`, next });
};

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
