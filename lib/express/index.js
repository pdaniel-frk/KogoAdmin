
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var express    = require('express');
var http       = require('http');
var config     = require('../configuration');
var logger     = require('../logger');
var middleware = require('../middleware');
var app        = express();
var router     = express.Router();
var multipart  = require('connect-multiparty');
var fs         = require('fs');

// ------- auth related stuff

var passport   = require('../authentication/passport');

var flash        = require('connect-flash')
var bodyParser   = require('body-parser');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var RedisStore   = require('connect-redis')(session);

app.use(cookieParser());

app.use(bodyParser.json({
  extended: true
}));

app.use(session({
  resave : true,
  saveUninitialized: true,
  secret: "efdc5985d8a28adee04b3aec9b7ec14460229819",
  store : new RedisStore({
    host : 'localhost',
    port : 6379,
    user : '',
    pass : ''
  }),
  cookie : {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    maxAge : 24 * 60 * 60 * 1000 // one day
  }
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// ------- end of auth stuff

// add query builder object for every request
app.all('*', middleware.query.validate);

if (!fs.existsSync(config.get('uploads:tempDir'))) {
  fs.mkdirSync(config.get('uploads:tempDir'));
}

app.use(multipart({
    uploadDir: config.get('uploads:tempDir')
}));

app.set('port', process.env.PORT || config.get('express:port'));

// Serving static files fallback just in case if Nginx wouldn't work
app.use('/static', express.static(ROOT_PATH + '/public'));

// load our routes
require('./../../app/routes.js')(router, passport);

app.use('/', router);

router.param('id', middleware.validator.id);

app.use(middleware.notFound);
app.use(middleware.error);

http.createServer(app).listen(app.get('port'));
module.exports = app;

console.log('running on port ', app.get('port'));
