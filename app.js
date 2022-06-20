require("dotenv").config();

// Geral
const express = require('express');
const cors = require('cors')
var path = require('path');
var logger = require('morgan');
var cookieParser =  require('cookie-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var historyRouter = require('./routes/history')
const reportRouter = require('./routes/report')

const app = express();

app.use(cors())
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

app.listen(process.env.PORT || 5000)

// module.exports = app;
