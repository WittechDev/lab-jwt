const getToken = (req) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    throw { message: "token is required" };
  }

  const token = req.headers.authorization.split(" ")[1];
  return token;
};

const verifyToken = async (token) => {
  // TODO: jwt verify token
  return;
};

const authentication = async (req, res, next) => {
  try {
    const token = getToken(req);
    const resp = await verifyToken(token);

    if (resp.user) {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    console.log("eror:", e.message);
    res.status(401).send({ message: "unauthorization" });
  }
};

module.exports = authentication;
