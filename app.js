// Geral
var path = require('path');
require("dotenv").config();
var logger = require('morgan');
var express = require('express');
var cookieParser =  require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var historyRouter = require('./routes/history')
const reportRouter = require('./routes/report')

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use('/', indexRouter);

//Rotas com auth
var acesso = require('./helpers/acessoApi')
app.use(acesso.validateJwt);
app.use('/questao', questoes);
app.use('/history', historyRouter)
app.use('/report', reportRouter)

module.exports = app;
