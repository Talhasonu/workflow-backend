const express = require('express');
const passport = require('passport');
const { jwtStrategy } = require('./src/config/passport');
const cors = require('cors');
const registerRoutes = require('./src/routes/app.routes');

const app = express();

// enable cors
app.use(cors({
  origin: "http://localhost:3000", // your Next.js frontend URL
  credentials: true
}));
app.options('*', cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);



module.exports = app;
