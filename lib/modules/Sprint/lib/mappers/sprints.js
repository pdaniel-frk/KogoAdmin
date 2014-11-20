
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Sprint       = require('./../models/sprint');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Sprints mapper class definition
 */
function SprintsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * SprintsMapper extends HttpMapper
 */
util.inherits(SprintsMapper, HttpMapper);

/**
 * Placeholder for URL to API's sprint resource
 */
SprintsMapper.prototype.apiUrl = '/sprints';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
SprintsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

SprintsMapper.prototype.save = function (sprint) {

  if (!(sprint instanceof Sprint)) {
    throw new Exception('Invalid model passed. Instance of Sprint expected');
  }

  if (!sprint.getId()) {
    return this.insert(sprint);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: sprint.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (sprints) {

      if (!_.isEmpty(sprints)) {
        return me.update(sprint);
      }

      return me.insert(sprint);
    });
};

SprintsMapper.prototype.insert = function (sprint) {

  if (!(sprint instanceof Sprint)) {
    throw new Exception('Invalid model passed. Instance of Sprint expected');
  }

  return this.sendPostRequest(sprint);
};

SprintsMapper.prototype.update = function (sprint) {

  if (!(sprint instanceof Sprint)) {
    throw new Exception('Invalid model passed. Instance of Sprint expected');
  }

  if (!sprint.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(sprint);
};

module.exports = SprintsMapper;
