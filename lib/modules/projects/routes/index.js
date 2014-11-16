
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var logger  = require(LIBRARY_PATH + '/logger');
var http    = require('http');
var request = require('request');
var _       = require('underscore');

exports.getAll = function(req, res){

  logger.info('Request.' + req.url);

  var queryUrl = '/projects';

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
    res.status(500).json('Internal Server Error');
  });
};

exports.create = function(req, res){

  logger.info('Request.' + req.url);

  var queryUrl = '/projects';
  var project = req.body;

  // temp hack
  project.accountId = 1;

  var options = {
      url: 'http://localhost:3001' + queryUrl,
      body: project,
      json: true,
      method: 'post'
  };

  request(options, function(error, response, body){
    return res.status(201).json(body);
  });
};

exports.update = function(req, res){

  logger.info('Request.' + req.url);

  var queryUrl = '/projects/' + req.params.projectId;

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
