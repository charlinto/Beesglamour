var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require ('mongoose');
var flash = require ('connect-flash');
var session = require('express-session');
const hbs = require('hbs');
const moment = require('moment');

const MongoStore = require('connect-mongo')(session);

const {mongoURI, globalVariable} = require('./config/defaultConfig')
const passport = require('passport');
require("./config/passport")(passport);

var indexRouter = require('./routes/index');
// let emailRoute = require('./routes/admin/email')
var usersRouter = require('./routes/users');
let authenticationRouter = require('./routes/authentication/index');
let adminRouter = require('./routes/admin/index');
let serviceRouter = require('./routes/admin/service')
let categoryRouter = require('./routes/admin/category');
let postServiceRouter = require('./routes/admin/postService')
let postRouter = require('./routes/admin/post');
let postGalleryRouter = require('./routes/admin/postGallery');
let galleryRouter = require('./routes/admin/gallery');
let singleRouter = require('./routes/single');
let bookMeRouter = require('./routes/admin/bookMe')
let getintouchRouter = require('./routes/admin/getintouch')
let commentRouter = require('./routes/admin/comment')
let singleCatRouter = require('./routes/singleCat');



var app = express();

//db connection
mongoose.connect(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() =>{
  console.log('connection was successful')
})
.catch(err =>{
  console.log(err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({cookie:{maxAge: 60000},
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));


app.use(
  session({
    secret: "secret",
    saveUninitialized: "true",
    resave: "true",
    cookie: {maxAge: 600000},
    store: new MongoStore ({mongooseConnection: mongoose.connection})
  })
)


app.use(flash());;
//passport middle ware
app.use(passport.initialize());
app.use(passport.session());


//globalvariables
app.use(globalVariable)

//registering partials
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerPartials(__dirname + '/views/partials/admin')
hbs.registerPartials(__dirname + '/views/partials/users')




hbs.registerHelper({
  eq: (v1, v2) => v1 === v2,
  ne: (v1, v2) => v1 !== v2,
  lt: (v1, v2) => v1 < v2,
  gt: (v1, v2) => v1 > v2,
  lte: (v1, v2) => v1 <= v2,
  gte: (v1, v2) => v1 >= v2,
  and() {
      return Array.prototype.every.call(arguments, Boolean);
  },
  or() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  }
});

hbs.registerHelper({
  formatDate: function (date, format) {
    return moment(date).utc().format(format)
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + ' '
      new_str = str.substr(0, len)
      new_str = str.substr(0, new_str.lastIndexOf(' '))
      new_str = new_str.length > 0 ? new_str : str.substr(0, len)
      return new_str + '...'
    }
    return str
  },
});


app.use('/', indexRouter);
// app.use('/', emailRoute);
app.use('/user', usersRouter);
app.use('/account', authenticationRouter);
app.use('/service',serviceRouter);
app.use('/admin', adminRouter);
app.use('/category', categoryRouter);
app.use('/post', postRouter);
app.use('/gallery', galleryRouter);
app.use('/bookMe',bookMeRouter);
app.use('/getintouch',getintouchRouter);
app.use('/postService',postServiceRouter)
app.use('/postGallery',postGalleryRouter)
app.use('/post', singleRouter);
app.use('/comments', commentRouter);
app.use('/category', singleCatRouter)





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
