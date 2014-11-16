
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var projectRoutes = require('../lib/modules/projects/routes');
var boardsRoutes  = require('../lib/modules/boards/routes');
var lanesRoutes   = require('../lib/modules/lanes/routes');
var usersRoutes   = require('../lib/modules/users/routes');

module.exports = function(app, passport) {

  // projects
  app.get('/api/projects', ensureAuthenticated, projectRoutes.getAll);
  app.post('/api/projects', ensureAuthenticated, projectRoutes.create);
  app.put('/api/projects/:projectId', ensureAuthenticated, projectRoutes.update);

  // boards
  app.get('/api/boards', ensureAuthenticated, boardsRoutes.getAll);
  app.post('/api/boards', ensureAuthenticated, boardsRoutes.create);
  app.put('/api/boards/:boardId', ensureAuthenticated, boardsRoutes.update);

  app.get('/api/lanes', ensureAuthenticated, lanesRoutes.getAll);
  app.post('/api/lanes', ensureAuthenticated, lanesRoutes.create);
  app.put('/api/lanes/:laneId', ensureAuthenticated, lanesRoutes.update);

  app.get('/api/users', ensureAuthenticated, usersRoutes.getAll);
  app.get('/api/user', ensureAuthenticated, usersRoutes.info);
  app.post('/api/users', ensureAuthenticated, usersRoutes.create);
  app.put('/api/users/:userId', ensureAuthenticated, usersRoutes.update);

  app.post('/api/users/avatars', ensureAuthenticated, usersRoutes.uploadAvatar);

  app.get('/login', function(req, res){
    res.status(200).sendFile(ROOT_PATH + '/public/login.html');
  });

  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // load the single view file
  // (angular will handle the page changes on the front-end)
  app.get('*', ensureAuthenticated, function(req, res) {
    res.sendFile(ROOT_PATH + '/public/index.html');
  });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
