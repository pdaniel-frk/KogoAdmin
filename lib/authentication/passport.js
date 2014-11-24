
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

// @see https://github.com/jaredhanson/passport-local/blob/master/examples/login/app.js

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserService   = require(LIBRARY_PATH + '/modules/User/lib/services/users');
var userService   = new UserService();
var sha1Crypt     = require('sha1');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var logger        = require(LIBRARY_PATH + '/logger');
var _             = require('underscore');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {

  // password needs to be removed!
  user.password = null;

  done(null, user);
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      var queryBuilder = new QueryBuilder();
      queryBuilder.setConditions({username: username});
      userService.all(queryBuilder)
        .then(function(users) {

          if (!users || _.isEmpty(users)) {
            logger.error('Users mapper returned invalid(non-array) or empty result', users);
            return done(null, false, { message: 'Unknown user'});
          }

          var user = users.pop();

          if (user.roleId != 4) {
            return done(null, false, { message: 'Insufficient privileges' });
          }

          var secret = 'opk23423asd!!$%^&*$#@';
          var passwordHash = sha1Crypt(password + secret);

          if (user.password != passwordHash) {
            logger.info('User ' + username + ' provided invalid password');
            return done(null, false, { message: 'Invalid password' });
          }

          return done(null, user);
        }).done();
    });
  }
));

module.exports = passport;
