
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var TimeLogModel  = require('../models/timeLog');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * TimeLogs service class definition
 */
function TimeLogs(timeLogsMapper) {
  if (!timeLogsMapper) {
    var TimeLogsMapper = require('../mappers/timeLogs');
    var timeLogsMapper = new TimeLogsMapper;
  }

  this.timeLogsMapper = timeLogsMapper;
}

/**
 * Method gets all timeLogs matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
TimeLogs.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.timeLogsMapper.fetchAll(query);
};

/**
 * Method gets single timeLog by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
TimeLogs.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid timeLog id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (timeLogs) {
    if (!_.isArray(timeLogs) || _.isEmpty(timeLogs)) {
      return null;
    }
    return timeLogs.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
TimeLogs.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var timeLog = new TimeLogModel(data);
  return this.timeLogsMapper.save(timeLog)
    .then(function (timeLogData) {
      return new TimeLogModel(timeLogData);
    });
};

module.exports = TimeLogs;
