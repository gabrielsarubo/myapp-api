// Geral
var path = require('path');
require("dotenv").config();
var logger = require('morgan');

// Express
var express = require('express');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//Sessão
const session = require("express-session")
app.use(session({
    secret: "#@A4327Asdzw",
    resave: false,
    saveUninitialized: false
}));

//Passaport
const passport = require('passport')
app.use(passport.initialize())
app.use(passport.session())

// Rotas
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
