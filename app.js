const express = require("express");
const passport = require("passport");
const { jwtStrategy } = require("./src/config/passport");
const cors = require("cors");
const registerRoutes = require("./src/routes/app.routes");
const config = require("./src/config/config");

const app = express();

// enable cors
const allowedOrigins = ["http://localhost:3000", config.Frontend_URL].filter(
  Boolean,
); // filter out undefined if config.Frontend_URL is not set

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.options("*", cors());

// serve static files
app.use(express.static("public"));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

module.exports = app;
