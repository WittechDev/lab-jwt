const express = require("express");
const authController = require("../controllers/authController");
const authenValidator = require("../validator/authenValidator");
const helper = require("../utils/helper");
const {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} = require("../utils/jwtGenerator");
const { getToken } = require("../middlewares/authentication");

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

const refresh = async (request, response, next) => {
  try {
    const access_token = jwtAccessTokenGenerate(request.user);
    const refresh_token = jwtRefreshTokenGenerate(request.user);
    helper.response({
      data: {
        access_token,
        refresh_token,
      },
      next,
    });
  } catch (error) {
    helper.errorResponse({ error, next });
  }
};

const google = async (request, response, next) => {
  try {
    const token = getToken(request);
    const result = await authController.googleAuth({ token });
    helper.response({
      data: result,
      next,
    });
  } catch (error) {
    helper.errorResponse({ error, next });
  }
};

router.post("/login", authenValidator.loginValidator, login);
router.post("/register", authenValidator.registerValidator, register);
router.post("/refresh", authenValidator.jwtRefreshTokenValidate, refresh);
router.get("/callback/google", google);

module.exports = router;
