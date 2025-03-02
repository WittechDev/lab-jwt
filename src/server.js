const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/database");
const logger = require("./middlewares/logger");
require("dotenv").config();

const userRouter = require("./routes/usersRoute");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(logger);

// Route
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.use("/api/users", userRouter);

// Database Connection
connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
