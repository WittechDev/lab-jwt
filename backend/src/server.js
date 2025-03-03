const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/database");
const userRouter = require("./routes/usersRoute");
const authRouter = require("./routes/authenRoute");
const responseHandler = require("./middlewares/responseHandler");
const authentication = require("./middlewares/authentication");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Route
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.use("/api/auth", authRouter);
app.use("/api/users", authentication, userRouter);

// Response Handler & Logger
app.use(responseHandler);

// Database Connection
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
