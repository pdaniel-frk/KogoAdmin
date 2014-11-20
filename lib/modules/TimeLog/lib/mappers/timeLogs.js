
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var TimeLog      = require('./../models/timeLog');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * TimeLogs mapper class definition
 */
function TimeLogsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * TimeLogsMapper extends HttpMapper
 */
util.inherits(TimeLogsMapper, HttpMapper);

/**
 * Placeholder for URL to API's timeLog resource
 */
TimeLogsMapper.prototype.apiUrl = '/time-logs';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
TimeLogsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

TimeLogsMapper.prototype.save = function (timeLog) {

  if (!(timeLog instanceof TimeLog)) {
    throw new Exception('Invalid model passed. Instance of TimeLog expected');
  }

  if (!timeLog.getId()) {
    return this.insert(timeLog);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: timeLog.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (timeLogs) {

      if (!_.isEmpty(timeLogs)) {
        return me.update(timeLog);
      }

      return me.insert(timeLog);
    });
};

TimeLogsMapper.prototype.insert = function (timeLog) {

  if (!(timeLog instanceof TimeLog)) {
    throw new Exception('Invalid model passed. Instance of TimeLog expected');
  }

  return this.sendPostRequest(timeLog);
};

TimeLogsMapper.prototype.update = function (timeLog) {

  if (!(timeLog instanceof TimeLog)) {
    throw new Exception('Invalid model passed. Instance of TimeLog expected');
  }

  if (!timeLog.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(timeLog);
};

module.exports = TimeLogsMapper;
