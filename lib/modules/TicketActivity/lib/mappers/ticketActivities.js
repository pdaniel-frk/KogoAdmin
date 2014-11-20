
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper     = require(LIBRARY_PATH + '/mappers/http');
var TicketActivity = require('./../models/ticketActivity');
var util           = require('util');
var Exception      = require(LIBRARY_PATH + '/exception');
var _              = require('underscore');
var QueryBuilder   = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * TicketActivities mapper class definition
 */
function TicketActivitiesMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * TicketActivitiesMapper extends HttpMapper
 */
util.inherits(TicketActivitiesMapper, HttpMapper);

/**
 * Placeholder for URL to API's ticketActivity resource
 */
TicketActivitiesMapper.prototype.apiUrl = '/ticket-activities';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
TicketActivitiesMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

TicketActivitiesMapper.prototype.save = function (ticketActivity) {

  if (!(ticketActivity instanceof TicketActivity)) {
    throw new Exception('Invalid model passed. Instance of TicketActivity expected');
  }

  if (!ticketActivity.getId()) {
    return this.insert(ticketActivity);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: ticketActivity.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (ticketActivities) {

      if (!_.isEmpty(ticketActivities)) {
        return me.update(ticketActivity);
      }

      return me.insert(ticketActivity);
    });
};

TicketActivitiesMapper.prototype.insert = function (ticketActivity) {

  if (!(ticketActivity instanceof TicketActivity)) {
    throw new Exception('Invalid model passed. Instance of TicketActivity expected');
  }

  return this.sendPostRequest(ticketActivity);
};

TicketActivitiesMapper.prototype.update = function (ticketActivity) {

  if (!(ticketActivity instanceof TicketActivity)) {
    throw new Exception('Invalid model passed. Instance of TicketActivity expected');
  }

  if (!ticketActivity.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(ticketActivity);
};

module.exports = TicketActivitiesMapper;
