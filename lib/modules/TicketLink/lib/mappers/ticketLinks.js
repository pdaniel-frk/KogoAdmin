
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var TicketLink   = require('./../models/ticketLink');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * TicketLinks mapper class definition
 */
function TicketLinksMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * TicketLinksMapper extends HttpMapper
 */
util.inherits(TicketLinksMapper, HttpMapper);

/**
 * Placeholder for URL to API's ticketLink resource
 */
TicketLinksMapper.prototype.apiUrl = '/ticket-links';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
TicketLinksMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

TicketLinksMapper.prototype.save = function (ticketLink) {

  if (!(ticketLink instanceof TicketLink)) {
    throw new Exception('Invalid model passed. Instance of TicketLink expected');
  }

  if (!ticketLink.getId()) {
    return this.insert(ticketLink);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: ticketLink.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (ticketLinks) {

      if (!_.isEmpty(ticketLinks)) {
        return me.update(ticketLink);
      }

      return me.insert(ticketLink);
    });
};

TicketLinksMapper.prototype.insert = function (ticketLink) {

  if (!(ticketLink instanceof TicketLink)) {
    throw new Exception('Invalid model passed. Instance of TicketLink expected');
  }

  return this.sendPostRequest(ticketLink);
};

TicketLinksMapper.prototype.update = function (ticketLink) {

  if (!(ticketLink instanceof TicketLink)) {
    throw new Exception('Invalid model passed. Instance of TicketLink expected');
  }

  if (!ticketLink.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(ticketLink);
};

module.exports = TicketLinksMapper;
