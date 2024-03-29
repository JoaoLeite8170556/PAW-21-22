
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/user');
var books = require('./routes/book');
var livraria = require('./routes/livraria');


var app = express();

mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://paw2122:paw2122@paw2122.oe2uc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log('connection succesful to DB')})
.catch((err)=>{console.error(err)});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(cors());
app.use(cors({
  credentials: true,
  origin: "http://localhost:4200"
}));

app.use('/uploads',express.static(path.join('uploads')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',index);
app.use('/users', users);
app.use('/books', books);
app.use('/livraria',livraria);

// catch 404 and forward to error handler
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
});

module.exports = app;
