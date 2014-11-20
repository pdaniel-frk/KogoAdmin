
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var AccountModule        = require('../lib/modules/Account');
var ApiAccountModule     = require('../lib/modules/ApiAccount');
var BoardModule          = require('../lib/modules/Board');
var CommentModule        = require('../lib/modules/Comment');
var LaneModule           = require('../lib/modules/Lane');
var ProjectModule        = require('../lib/modules/Project');
var SprintModule         = require('../lib/modules/Sprint');
var TagModule            = require('../lib/modules/Tag');
var TicketActivityModule = require('../lib/modules/TicketActivity');
var TicketLinkModule     = require('../lib/modules/TicketLink');
var TicketStatusModule   = require('../lib/modules/TicketStatus');
var TicketModule         = require('../lib/modules/Ticket');
var TimeLogModule        = require('../lib/modules/TimeLog');
var UserModule           = require('../lib/modules/User');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

function ensureAuthenticatedApi(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(403).json('Forbidden');
}

module.exports = function(router, passport) {

  // account resources
  router.get('/api/accounts', ensureAuthenticatedApi, AccountModule.Routes.Api.get);
  router.get('/api/accounts/:id', ensureAuthenticatedApi, AccountModule.Routes.Api.getById);
  router.post('/api/accounts', ensureAuthenticatedApi, AccountModule.Routes.Api.create);
  router.put('/api/accounts/:id', ensureAuthenticatedApi, AccountModule.Routes.Api.update);

  // api account resources
  router.get('/api/api-accounts', ensureAuthenticatedApi, ApiAccountModule.Routes.Api.get);
  router.get('/api/api-accounts/:id', ensureAuthenticatedApi, ApiAccountModule.Routes.Api.getById);
  router.post('/api/api-accounts', ensureAuthenticatedApi, ApiAccountModule.Routes.Api.create);
  router.put('/api/api-accounts/:id', ensureAuthenticatedApi, ApiAccountModule.Routes.Api.update);

  // board resources
  router.get('/api/boards', ensureAuthenticatedApi, BoardModule.Routes.Api.get);
  router.get('/api/boards/:id', ensureAuthenticatedApi, BoardModule.Routes.Api.getById);
  router.post('/api/boards', ensureAuthenticatedApi, BoardModule.Routes.Api.create);
  router.put('/api/boards/:id', ensureAuthenticatedApi, BoardModule.Routes.Api.update);

  // comment resources
  router.get('/api/comments', ensureAuthenticated, CommentModule.Routes.Api.get);
  router.get('/api/comments/:id', ensureAuthenticatedApi, CommentModule.Routes.Api.getById);
  router.post('/api/comments', ensureAuthenticatedApi, CommentModule.Routes.Api.create);
  router.put('/api/comments/:id', ensureAuthenticatedApi, CommentModule.Routes.Api.update);

  // lane resources
  router.get('/api/lanes', ensureAuthenticated, LaneModule.Routes.Api.get);
  router.get('/api/lanes/:id', ensureAuthenticatedApi, LaneModule.Routes.Api.getById);
  router.post('/api/lanes', ensureAuthenticatedApi, LaneModule.Routes.Api.create);
  router.put('/api/lanes/:id', ensureAuthenticatedApi, LaneModule.Routes.Api.update);

  // project resources
  router.get('/api/projects', ensureAuthenticated, ProjectModule.Routes.Api.get);
  router.get('/api/projects/:id', ensureAuthenticatedApi, ProjectModule.Routes.Api.getById);
  router.post('/api/projects', ensureAuthenticatedApi, ProjectModule.Routes.Api.create);
  router.put('/api/projects/:id', ensureAuthenticatedApi, ProjectModule.Routes.Api.update);

  // sprint resources
  router.get('/api/sprints', ensureAuthenticated, SprintModule.Routes.Api.get);
  router.get('/api/sprints/:id', ensureAuthenticatedApi, SprintModule.Routes.Api.getById);
  router.post('/api/sprints', ensureAuthenticatedApi, SprintModule.Routes.Api.create);
  router.put('/api/sprints/:id', ensureAuthenticatedApi, SprintModule.Routes.Api.update);

  // tag resources
  router.get('/api/tags', ensureAuthenticated, TagModule.Routes.Api.get);
  router.get('/api/tags/:id', ensureAuthenticatedApi, TagModule.Routes.Api.getById);
  router.post('/api/tags', ensureAuthenticatedApi, TagModule.Routes.Api.create);
  router.put('/api/tags/:id', ensureAuthenticatedApi, TagModule.Routes.Api.update);

  // ticket activity resources
  router.get('/api/ticket-activities', ensureAuthenticated, TicketActivityModule.Routes.Api.get);
  router.get('/api/ticket-activities/:id', ensureAuthenticatedApi, TicketActivityModule.Routes.Api.getById);
  router.post('/api/ticket-activities', ensureAuthenticatedApi, TicketActivityModule.Routes.Api.create);
  router.put('/api/ticket-activities/:id', ensureAuthenticatedApi, TicketActivityModule.Routes.Api.update);

  // ticket links resources
  router.get('/api/ticket-links', ensureAuthenticated, TicketLinkModule.Routes.Api.get);
  router.get('/api/ticket-links/:id', ensureAuthenticatedApi, TicketLinkModule.Routes.Api.getById);
  router.post('/api/ticket-links', ensureAuthenticatedApi, TicketLinkModule.Routes.Api.create);
  router.put('/api/ticket-links/:id', ensureAuthenticatedApi, TicketLinkModule.Routes.Api.update);

  // ticket status resources
  router.get('/api/ticket-statuses', ensureAuthenticated, TicketStatusModule.Routes.Api.get);
  router.get('/api/ticket-statuses/:id', ensureAuthenticatedApi, TicketStatusModule.Routes.Api.getById);
  router.post('/api/ticket-statuses', ensureAuthenticatedApi, TicketStatusModule.Routes.Api.create);
  router.put('/api/ticket-statuses/:id', ensureAuthenticatedApi, TicketStatusModule.Routes.Api.update);

  // ticket resources
  router.get('/api/tickets', ensureAuthenticated, TicketModule.Routes.Api.get);
  router.get('/api/tickets/:id', ensureAuthenticatedApi, TicketModule.Routes.Api.getById);
  router.post('/api/tickets', ensureAuthenticatedApi, TicketModule.Routes.Api.create);
  router.put('/api/tickets/:id', ensureAuthenticatedApi, TicketModule.Routes.Api.update);

  // time log resources
  router.get('/api/time-logs', ensureAuthenticated, TimeLogModule.Routes.Api.get);
  router.get('/api/time-logs/:id', ensureAuthenticatedApi, TimeLogModule.Routes.Api.getById);
  router.post('/api/time-logs', ensureAuthenticatedApi, TimeLogModule.Routes.Api.create);
  router.put('/api/time-logs/:id', ensureAuthenticatedApi, TimeLogModule.Routes.Api.update);

  // user resources
  router.get('/api/users', ensureAuthenticated, UserModule.Routes.Api.get);
  router.get('/api/users/:id', ensureAuthenticatedApi, UserModule.Routes.Api.getById);
  router.post('/api/users', ensureAuthenticatedApi, UserModule.Routes.Api.create);
  router.put('/api/users/:id', ensureAuthenticatedApi, UserModule.Routes.Api.update);

  router.post('/api/users/avatars', ensureAuthenticated, UserModule.Routes.Frontend.uploadAvatar);

  // ------------------------------------------------------------------------------
  // -------------------------------- FRONTEND URLS -------------------------------
  // ------------------------------------------------------------------------------

  router.get('/user', ensureAuthenticated, UserModule.Routes.Frontend.getDetails);

  router.get('/login', function(req, res){
    res.status(200).sendFile(ROOT_PATH + '/public/login.html');
  });

  router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      res.status(200).json('OK');
    }
  );

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

  // load the single view file
  // (angular will handle the page changes on the front-end)
  router.get('*', ensureAuthenticated, function(req, res) {
    res.sendFile(ROOT_PATH + '/public/index.html');
  });
};
