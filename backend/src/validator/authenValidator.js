const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/;

const loginValidator = async (request, response, next) => {
  const { email, password } = request.body;
  if (!email) {
    response.status(400).json({ message: "email is required." });
  } else if (!EMAIL_REGEXP.test(email)) {
    response.status(400).json({ message: "email is invalid." });
  }

  if (!password) {
    response.status(400).json({ message: "password is required." });
  }

  next();
};

const registerValidator = async (request, response, next) => {
  const { username, email, password } = request.body;

  if (!username) {
    return response.status(400).json({ message: "username is required." });
  }

  if (!email) {
    return response.status(400).json({ message: "email is required." });
  } else if (!EMAIL_REGEXP.test(email)) {
    return response.status(400).json({ message: "email is invalid." });
  }

  if (!password) {
    return response.status(400).json({ message: "password is required." });
  } else if (!PASSWORD_REGEXP.test(password)) {
    return response.status(400).json({ message: "password is invalid." });
  }

  next();
};

module.exports = { loginValidator, registerValidator };
