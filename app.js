const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

module.exports.budget = "£20";
const participants = ["Nora", "Tracey", "Des", "Morgan","Rory", "Matthew","Leah","Kerry", "Kieran", "Connor"];
const results = setResults();
module.exports.results = results;
const indexRouter = require('./routes/index');
const resultRouter = require('./routes/result');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/find_santa', resultRouter);

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

function setResults () {

  let length = participants.length;

  if (length <= 1) {
    return null;
  }

  var results = {};

  let notTaken;
  notTaken = participants.map((x) => x);
  let notTakenLength = notTaken.length;
  for (let i = 0; i < length; i++) {
    do {
      var randomIndex = Math.floor(Math.random() * notTakenLength);
    } while (notTaken[randomIndex] === participants[i]);

    results[participants[i]] = notTaken[randomIndex];
    notTaken[randomIndex] = null;
    notTaken = cleanArray(notTaken);
    notTakenLength--;
  }


  return results
}

//enter the name of the santa and returns the person it's for.

//Takes out array elements that are === null
function cleanArray(arr) {

  let cleanArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != null) {
      cleanArr.push(arr[i]);
    }
  }
  return cleanArr;
}

// console.table(results);

module.exports = app;
