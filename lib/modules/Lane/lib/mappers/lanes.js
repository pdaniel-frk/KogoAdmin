
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Lane         = require('./../models/lane');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Lanes mapper class definition
 */
function LanesMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * LanesMapper extends HttpMapper
 */
util.inherits(LanesMapper, HttpMapper);

/**
 * Placeholder for URL to API's lane resource
 */
LanesMapper.prototype.apiUrl = '/lanes';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
LanesMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

LanesMapper.prototype.save = function (lane) {

  if (!(lane instanceof Lane)) {
    throw new Exception('Invalid model passed. Instance of Lane expected');
  }

  if (!lane.getId()) {
    return this.insert(lane);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: lane.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (lanes) {

      if (!_.isEmpty(lanes)) {
        return me.update(lane);
      }

      return me.insert(lane);
    });
};

LanesMapper.prototype.insert = function (lane) {

  if (!(lane instanceof Lane)) {
    throw new Exception('Invalid model passed. Instance of Lane expected');
  }

  return this.sendPostRequest(lane);
};

LanesMapper.prototype.update = function (lane) {

  if (!(lane instanceof Lane)) {
    throw new Exception('Invalid model passed. Instance of Lane expected');
  }

  if (!lane.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(lane);
};

module.exports = LanesMapper;
