
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Ticket       = require('./../models/ticket');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Tickets mapper class definition
 */
function TicketsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * TicketsMapper extends HttpMapper
 */
util.inherits(TicketsMapper, HttpMapper);

/**
 * Placeholder for URL to API's ticket resource
 */
TicketsMapper.prototype.apiUrl = '/tickets';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
TicketsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

TicketsMapper.prototype.save = function (ticket) {

  if (!(ticket instanceof Ticket)) {
    throw new Exception('Invalid model passed. Instance of Ticket expected');
  }

  if (!ticket.getId()) {
    return this.insert(ticket);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: ticket.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (tickets) {

      if (!_.isEmpty(tickets)) {
        return me.update(ticket);
      }

      return me.insert(ticket);
    });
};

TicketsMapper.prototype.insert = function (ticket) {

  if (!(ticket instanceof Ticket)) {
    throw new Exception('Invalid model passed. Instance of Ticket expected');
  }

  return this.sendPostRequest(ticket);
};

TicketsMapper.prototype.update = function (ticket) {

  if (!(ticket instanceof Ticket)) {
    throw new Exception('Invalid model passed. Instance of Ticket expected');
  }

  if (!ticket.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(ticket);
};

module.exports = TicketsMapper;
