const express = require("express");
const authController = require("../controllers/authController");
const authenValidator = require("../validator/authenValidator");
const helper = require("../utils/helper");

const router = express.Router();

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const result = await authController.login({ email, password });
    helper.response({ data: result, next });
  } catch (error) {
    helper.errorResponse({ error, next });
  }
};

const register = async (request, response, next) => {
  try {
    const { username, email, password } = request.body;

    const result = await authController.register({ username, email, password });
    helper.response({ data: result, next });
  } catch (error) {
    helper.errorResponse({ error, next });
  }
};

router.post("/login", authenValidator.loginValidator, login);
router.post("/register", authenValidator.registerValidator, register);

module.exports = router;
