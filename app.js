/* Node modules: */

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');


/* Database connection config: */

mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');


/* App init: */

var app = express();


/* View engine config: */

app.set('views', path.join(__dirname, 'views'));
app.engine('handlerbars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlerbars');


/* Body parser middleware config: */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/* Set static folder: */

app.use(express.static(path.join(___dirname, 'public')));


/* Express session config: */

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


/* Passport init: */

app.use(passport.initialize());
app.use(passport.session());


/* Express validator config (copied from their official Github documentation): */

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
          root = namespace.shift()
          formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value : value
    };
  }
}));


/* Connect Flash (a type of local storage): */

app.use(flash());


/* Global var for Flash method: */

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


/* Middleware for route files: */

app.use('/', routes);
app.use('/users', users);


/* Set port and start server: */

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port ' + app.get('port'));
});