
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var TicketStatusModel = require('../models/ticketStatus');
var QueryBuilder      = require(LIBRARY_PATH + '/routes/queryBuilder');
var _                 = require('underscore');
var KogoException     = require(LIBRARY_PATH + '/exception');

/**
 * TicketStatuses service class definition
 */
function TicketStatuses(ticketStatusesMapper) {
  if (!ticketStatusesMapper) {
    var TicketStatusesMapper = require('../mappers/ticketStatuses');
    var ticketStatusesMapper = new TicketStatusesMapper;
  }

  this.ticketStatusesMapper = ticketStatusesMapper;
}

/**
 * Method gets all ticketStatuses matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
TicketStatuses.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.ticketStatusesMapper.fetchAll(query);
};

/**
 * Method gets single ticketStatus by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
TicketStatuses.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid ticketStatus id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (ticketStatuses) {
    if (!_.isArray(ticketStatuses) || _.isEmpty(ticketStatuses)) {
      return null;
    }
    return ticketStatuses.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
TicketStatuses.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var ticketStatus = new TicketStatusModel(data);
  return this.ticketStatusesMapper.save(ticketStatus)
    .then(function (ticketStatusData) {
      return new TicketStatusModel(ticketStatusData);
    });
};

module.exports = TicketStatuses;
