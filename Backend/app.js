const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const cookie = require('cookie-session');
const flash = require('connect-flash');
const app = express();
const userRouter = require('./v1/routes/users')
const adminRouter = require('./admin/routes/admin')
const departmentRouter = require('./v1/routes/department')
const managerRouter = require('./manager/routes/manager_routes')
const attendanceRouter = require('./v1/routes/attendance')
const roleRouter = require('./v1/routes/role')



app.use(flash());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.json());

app.use(
  cookie({
    // Cookie config, take a look at the docs...
    secret: 'I Love India...',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true
    },
  }),
);

app.get('/' ,  (req , res)  => {

   return res.status(200).send('Welcome to the ERP')
})


app.use('/v1/users' , userRouter)
app.use('/v1/department' , departmentRouter)
app.use('/admin' , adminRouter)
app.use('/manager' , managerRouter)
app.use('/v1/attendance' , attendanceRouter)
app.use('/v1/role' , roleRouter)

//Database connection with mongodb
const mongoose = require('./config/database');



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log("err..........", err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;