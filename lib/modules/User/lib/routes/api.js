
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var UsersService = require('../services/users');
var logger       = require(LIBRARY_PATH + '/logger');
var sha1Crypt    = require('sha1');
var config       = require(LIBRARY_PATH + '/configuration');
var path         = require('path');
var fs           = require('fs');

exports.get = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var usersService = new UsersService();
  usersService.all(req.query)
  .then(function (users) {
    return res.status(200).json(users);
  }, function (result) {
    logger.error('Fail - ' + result);
    return res.status(500).json('Internal Server Error');
  })
  .catch(function (error) {
    logger.error('Error - ' + error);
    return res.status(500).json('Internal Server Error');
  });
};

exports.getById = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  var usersService = new UsersService();
  usersService.get(req.params.id)
  .then(function (user) {
    if (!user) return res.status(404).json('Not Found');
    return res.status(200).json(user);
  }, function (result) {
    logger.error('Fail - ' + result);
    return res.status(500).json('Internal Server Error');
  })
  .catch(function (error) {
    logger.error('Error - ' + error);
    return res.status(500).json('Internal Server Error');
  });
};

exports.create = function (req, res) {
  logger.info(req.method + ' request: ' + req.url, req.body);

  var user = req.body;
  user.accountId = 1;

  // salting password
  var passwordSalt = '12446533!!$%^&*$#@';
  user.password = sha1Crypt(user.password + passwordSalt);

  if (!user.avatar) {
    return res.status(400).json({'Error' : 'Avatar is required'});
  }

  // change image path from temp to default uploads path
  var oldPath = user.avatar;
  var fileName = user.avatar.split('/').pop();
  user.avatar = config.get("uploads:dir") + '/' + fileName;

  fs.renameSync(oldPath, ROOT_PATH + '/public/' + user.avatar);

  user.avatar = '/static' + user.avatar;

  var usersService = new UsersService();
  usersService.save(user)
    .then(function (user) {
      if (user === null) return res.status(404).json('Not Found');
      res.setHeader('Location', '/api/users/' +  user.getId());
      return res.status(201).json(user);
    }, function (result) {
      logger.error('Fail - ' + result);
      return res.status(500).json('Internal Server Error');
    })
    .catch(function (error) {
      logger.error('Error - ' + error);
      return res.status(500).json('Internal Server Error');
    });
};

exports.update = function (req, res) {
  logger.info(req.method + ' request: ' + req.url);

  req.body.id = parseInt(req.params.id);

  var user = req.body;

  if (user.password) {
    // salting password
    var passwordSalt = '12446533!!$%^&*$#@';
    user.password = sha1Crypt(user.password + passwordSalt);
  }

  if (user.avatar) {
    // change image path from temp to default uploads path
    var oldPath = user.avatar;
    var fileName = user.avatar.split('/').pop();
    user.avatar = config.get("uploads:dir") + '/' + fileName;

    fs.renameSync(oldPath, ROOT_PATH + '/public/' + user.avatar);

    user.avatar = '/static' + user.avatar;
  }

  var usersService = new UsersService();
  usersService.save(user)
    .then(function (user) {
      if (user === null) return res.status(404).json('Not Found');
      res.setHeader('Location', '/api/users/' +  user.getId());
      return res.status(201).json(user);
    }, function (result) {
      logger.error('Fail - ' + result);
      return res.status(500).json('Internal Server Error');
    })
    .catch(function (error) {
      logger.error('Error - ' + error);
      return res.status(500).json('Internal Server Error');
    });
};

// ------------------------------------------------------- //
// ------------ DELETE REQUESTS ARE DISABLED ------------- //
// ------------------------------------------------------- //

// exports.delete = function (req, res) {
//   logger.info(req.method + ' request: ' + req.url);

//   var usersService = new UsersService();
//   usersService.del(req.params.id)
//   .then(function (numberOfDeleted) {
//     if (numberOfDeleted === 0) return res.status(404).json('Not Found');
//     return res.status(204).json('No Content');
//   }, function (result) {
//     logger.error('Fail - ' + result);
//     return res.status(500).json('Internal Server Error');
//   })
//   .catch(function (error) {
//     logger.error('Error - ' + error);
//     return res.status(500).json('Internal Server Error');
//   });
// };
