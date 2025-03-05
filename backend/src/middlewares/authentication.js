const helper = require("../utils/helper");
const jwt = require("jsonwebtoken");

const getToken = (req) => {
  if (!req.headers.authorization) {
    throw { code: 401, message: "token is required" };
  }

  const token = req.headers.authorization.split(" ")[1];
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    throw { code: 401, message: "unauthorized" };
  }
};

const authentication = (req, res, next) => {
  try {
    const token = getToken(req);
    verifyToken(token);

    next();
  } catch (error) {
    helper.errorResponse({ error, next });
  }
};

module.exports = authentication;
module.exports.getToken = getToken;
