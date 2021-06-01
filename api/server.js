if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  const express = require('express');
  const mongoose = require('mongoose');
  const cookieParser = require('cookie-parser');
  const cors = require('cors');
  const bodyParser = require('body-parser');

  mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@magazinsportiv.ywied.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
);
  
  const server = express();
  server.use(cors());
  server.use(bodyParser.json());
  server.use(cookieParser());
  
  const usersRouter = require('./user/user-router');
  const produsRouter = require('./produs/produs-router');
  const authRouter = require('./auth/auth');

  server.use('/api/user', usersRouter);
  server.use('/api/produs', produsRouter);
  server.use('/api/auth', authRouter);

  server.get('/', (req, res) => {
    res.send('<h1>Magazin sportiv project api</h1>')
});


server.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: 'Something went wrong',
  });
});

  module.exports = server;