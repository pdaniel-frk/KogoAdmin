
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var TicketActivityModel = require('../models/ticketActivity');
var QueryBuilder        = require(LIBRARY_PATH + '/routes/queryBuilder');
var _                   = require('underscore');
var KogoException       = require(LIBRARY_PATH + '/exception');

/**
 * TicketActivities service class definition
 */
function TicketActivities(ticketActivitiesMapper) {
  if (!ticketActivitiesMapper) {
    var TicketActivitiesMapper = require('../mappers/ticketActivities');
    var ticketActivitiesMapper = new TicketActivitiesMapper();
  }

  this.ticketActivitiesMapper = ticketActivitiesMapper;
}

/**
 * Method gets all ticketActivities matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
TicketActivities.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.ticketActivitiesMapper.fetchAll(query);
};

/**
 * Method gets single ticketActivity by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
TicketActivities.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid ticketActivity id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
    .then(function (ticketActivities) {
      if (!_.isArray(ticketActivities) || _.isEmpty(ticketActivities)) {
        return null;
      }
      return ticketActivities.shift();
    });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
TicketActivities.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.');
  }

  var ticketActivity = new TicketActivityModel(data);
  return this.ticketActivitiesMapper.save(ticketActivity)
    .then(function (ticketActivityData) {
      return new TicketActivityModel(ticketActivityData);
    });
};

// ----------------- FRONTEND METHODS -----------------

TicketActivities.prototype.getTicketActivities = function () {

  var query = new QueryBuilder();

  query.setFields(
    {
      0 : "ta.userId",
      1 : "ta.type",
      2 : "ta.createdAt",
      3 : "ta.newValue",
      4 : "ta.field",
      "t.name" : "ticket",
      "u.username" : "user",
      "u.avatar" : "userAvatar"
    }
  );

  query.setJoins(
    [
      "ticket",
      "user"
    ]
  );

  return this.all(query);
};

module.exports = TicketActivities;
