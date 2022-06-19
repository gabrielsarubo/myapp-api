// Geral
var path = require('path');
require("dotenv").config();
var logger = require('morgan');
var cookieParser = require('cookie-parser');


// Express
var express = require('express');
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Cookies
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
var cadastrarUserRouter = require('./routes/cadastrarUser');
var questoes = require('./routes/questoes');

app.use('/users', usersRouter);
app.use('/register', cadastrarUserRouter);

//Rotas com auth
var acesso = require('./helpers/acessoApi')
app.use(acesso.validateJwt);
app.use('/questao', questoes);

module.exports = app;
