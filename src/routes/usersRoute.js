const express = require("express");
const userController = require("../controllers/usersController");

const router = express.Router();

const getUsers = async (request, response) => {
  const result = await userController.getUsers();
  response.status(200).json(result);
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id);
  const result = await userController.getUserById(id);
  response.status(200).json(result);
};

const createUser = async (request, response) => {
  const { name, email } = request.body;
  const result = await userController.createUser({ name, email });
  response.status(201).send(`User added with ID: ${result.insertId}`);
};

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;
  await userController.updateUser(id, { name, email });
  response.status(200).send(`User modified with ID: ${id}`);
};

const deleteUser = async (request, response) => {
  const id = parseInt(request.params.id);
  await userController.deleteUser(id);
  response.status(200).send(`User deleted with ID: ${id}`);
};

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
