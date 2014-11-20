
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var TicketStatus = require('./../models/ticketStatus');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * TicketStatuses mapper class definition
 */
function TicketStatusesMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * TicketStatusesMapper extends HttpMapper
 */
util.inherits(TicketStatusesMapper, HttpMapper);

/**
 * Placeholder for URL to API's ticketStatus resource
 */
TicketStatusesMapper.prototype.apiUrl = '/ticket-statuses';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
TicketStatusesMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

TicketStatusesMapper.prototype.save = function (ticketStatus) {

  if (!(ticketStatus instanceof TicketStatus)) {
    throw new Exception('Invalid model passed. Instance of TicketStatus expected');
  }

  if (!ticketStatus.getId()) {
    return this.insert(ticketStatus);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: ticketStatus.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (ticketStatuses) {

      if (!_.isEmpty(ticketStatuses)) {
        return me.update(ticketStatus);
      }

      return me.insert(ticketStatus);
    });
};

TicketStatusesMapper.prototype.insert = function (ticketStatus) {

  if (!(ticketStatus instanceof TicketStatus)) {
    throw new Exception('Invalid model passed. Instance of TicketStatus expected');
  }

  return this.sendPostRequest(ticketStatus);
};

TicketStatusesMapper.prototype.update = function (ticketStatus) {

  if (!(ticketStatus instanceof TicketStatus)) {
    throw new Exception('Invalid model passed. Instance of TicketStatus expected');
  }

  if (!ticketStatus.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(ticketStatus);
};

module.exports = TicketStatusesMapper;
