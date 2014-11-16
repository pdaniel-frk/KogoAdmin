
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var logger    = require(LIBRARY_PATH + '/logger');
var http      = require('http');
var request   = require('request');
var _         = require('underscore');
var sha1Crypt = require('sha1');
var config    = require(LIBRARY_PATH + '/configuration');
var path      = require('path');
var FS        = require("q-io/fs");

exports.getAll = function(req, res){

  logger.info('Request.' + req.url);

  var queryUrl = '/users';

  if (!_.isEmpty(req.query)) {

    var query = req.query;

    var value = null;
    var conditions = [];
    for (var field in query.conditions) {
      value = query.conditions[field];
      if (_.isString(value)) {
        conditions.push('conditions[' + field + ']=' + value);
      }

      if (_.isArray(value)) {
        var subValue;
        var valid = true;
        for (var subIndex in value) {
          subValue = value[subIndex];
          if (!_.isString(subValue)) {
            valid = false;
          }
        }

        if (valid) {
          for (var subIndex in value) {
            subValue = value[subIndex];
            conditions.push('conditions[' + field + ']=' + subValue);
          }
        }
      }
    }

    queryUrl += '?' + conditions.join('&');

    var orders = [];
    if (query.order) {
      for (var field in query.order) {
        var order = query.order[field];
        if (_.isString(order)) {
          orders.push('order[' + field + ']=' + order);
        }
      }

      queryUrl += '&' + orders.join('&');
    }
  }

  var options = {
    host: 'localhost',
    port: 3001,
    path: queryUrl
  };

  http.get(options, function(response){
    response.setEncoding('utf-8');

    var responseString = '';

    response.on('data', function(data) {
      responseString += data;
    });

    response.on('end', function() {
      res.status(200).send(responseString);
    });

  }).on('error', function(e){
    return res.status(500).json('Internal Server Error');
  });
};

exports.info = function(req, res) {
  return res.status(200).json(req.user);
}


exports.create = function(req, res){

  logger.info('Request.' + req.url);

  var queryUrl = '/users';
  var user = req.body;

  // temp hack
  user.accountId = 1;
  user.roleId = 3;

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
  FS.rename(oldPath, ROOT_PATH + '/public/' + user.avatar)
    .then(function() {
      var options = {
        url: 'http://localhost:3001' + queryUrl,
        body: user,
        json: true,
        method: 'post'
      };

      request(options, function(error, response, body){
        return res.status(201).json(body);
      });
    })
    .fail(function (error) {
      console.log(error);
      return res.status(500).json('Internal Server Error');
    });
};

exports.update = function(req, res){

  logger.info('Request.' + req.url);

  var queryUrl = '/users/' + req.params.userId;

  var options = {
      url: 'http://localhost:3001' + queryUrl,
      body: req.body,
      json: true,
      method: 'put'
  };

  request(options, function(error, response, body){
    return res.status(200).json(body);
  });
};

exports.uploadAvatar = function (req, res) {
  var data = _.pick(req.body, 'type');
  var uploadPath = path.normalize(config.get("uploads:dir"));
  var file = req.files.file;
  // console.log(file.name); //original name (ie: sunset.png)
  // console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
  // console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)

  return res.status(200).json(file);
};
