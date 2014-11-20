
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var TicketModel   = require('../models/ticket');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Tickets service class definition
 */
function Tickets(ticketsMapper) {
  if (!ticketsMapper) {
    var TicketsMapper = require('../mappers/tickets');
    var ticketsMapper = new TicketsMapper;
  }

  this.ticketsMapper = ticketsMapper;
}

/**
 * Method gets all tickets matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Tickets.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.ticketsMapper.fetchAll(query);
};

/**
 * Method gets single ticket by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Tickets.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid ticket id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (tickets) {
    if (!_.isArray(tickets) || _.isEmpty(tickets)) {
      return null;
    }
    return tickets.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Tickets.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var ticket = new TicketModel(data);
  return this.ticketsMapper.save(ticket)
    .then(function (ticketData) {
      return new TicketModel(ticketData);
    });
};

module.exports = Tickets;
