const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { expressjwt } = require('express-jwt');
const jwtKey = "acf9a3305987428411d54a7d4b2fdff6";

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const checklistsGuestsRouter = require('./routes/checklists-guests');
const checklistsRouter = require('./routes/checklists');
const tasksRouter = require('./routes/tasks');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressjwt({ secret: jwtKey, algorithms: ['HS256'] }).unless({
    path: [
        "/login",
        "/signup",
        "/logout",
        "/refresh-token",
    ]
}));

// app.options('*', cors());
app.use(cors({
    origin: ['http://localhost:5173',],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checklists-guests', checklistsGuestsRouter);
app.use('/checklists', checklistsRouter);
app.use('/tasks', tasksRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
})

module.exports = app;
