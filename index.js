const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');
const { Sequelize } = require("sequelize");
const SequelizeStore = require('connect-session-sequelize');
const sessionStore = SequelizeStore(session.Store);



const db = require('./app/config/Database.js');
const adminnRouter = require('./app/api/v1/adminn/AdminRouter.js');
const barangRouter = require('./app/api/v1/barang/BarangRouter.js');
const detailRouter = require('./app/api/v1/detail/DetailRouter.js');
const kategoriRouter = require('./app/api/v1/kategori/KategoriRouter.js');
const transaksiRouter = require('./app/api/v1/transaksi/TransaksiRouter.js');
const authRouter = require("./app/auth/AuthRouter.js");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const { single } = require('./multer.js');

dotenv.config()
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const store = new sessionStore({
    db: db
});

// try{
// db.sync()
// } catch(err){
// console.error(err)
// }


// store.sync();

app.use(session({
    secret: process.env.SESS_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
    }
}));



const v1 = '/api/v1';
app.use(v1, adminnRouter);
app.use(v1, barangRouter);
app.use(v1, detailRouter);
app.use(v1, kategoriRouter);
app.use(v1, transaksiRouter);

app.use(authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;