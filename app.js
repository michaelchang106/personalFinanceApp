let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
<<<<<<< HEAD

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let signUpRouter = require("./routes/signUp");
=======
let indexRouter = require("./routes/index.js");
let signupRouter = require("./routes/signup");
>>>>>>> 367fd6f49613c5aeb0e7af67adc8ab57e41e1b89

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
<<<<<<< HEAD
app.use("/users", usersRouter);
app.use("/signUp", signUpRouter);
=======
app.use("/signup", signupRouter);
>>>>>>> 367fd6f49613c5aeb0e7af67adc8ab57e41e1b89

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
