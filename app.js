const express = require("express");
const passport = require("passport");
const { jwtStrategy } = require("./src/config/passport");
const cors = require("cors");
const registerRoutes = require("./src/routes/app.routes");
const config = require("./src/config/config");

const app = express();

// enable cors
const allowedOrigins = [
  "http://localhost:3000",
  ...(config.Frontend_URLs || []),
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true); // allow server-to-server or tools without Origin header
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn(
      `CORS rejected origin: ${origin}. Allowed: ${allowedOrigins.join(", ")}`,
    );
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

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
