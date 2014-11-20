
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var LaneTagLink  = require('./../models/laneTagLink');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * LaneTagLinks mapper class definition
 */
function LaneTagLinksMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * LaneTagLinksMapper extends HttpMapper
 */
util.inherits(LaneTagLinksMapper, HttpMapper);

/**
 * Placeholder for URL to API's laneTagLink resource
 */
LaneTagLinksMapper.prototype.apiUrl = '/lane-tag-links';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
LaneTagLinksMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

LaneTagLinksMapper.prototype.save = function (laneTagLink) {

  if (!(laneTagLink instanceof LaneTagLink)) {
    throw new Exception('Invalid model passed. Instance of LaneTagLink expected');
  }

  if (!laneTagLink.getId()) {
    return this.insert(laneTagLink);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: laneTagLink.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (laneTagLinks) {

      if (!_.isEmpty(laneTagLinks)) {
        return me.update(laneTagLink);
      }

      return me.insert(laneTagLink);
    });
};

LaneTagLinksMapper.prototype.insert = function (laneTagLink) {

  if (!(laneTagLink instanceof LaneTagLink)) {
    throw new Exception('Invalid model passed. Instance of LaneTagLink expected');
  }

  return this.sendPostRequest(laneTagLink);
};

LaneTagLinksMapper.prototype.update = function (laneTagLink) {

  if (!(laneTagLink instanceof LaneTagLink)) {
    throw new Exception('Invalid model passed. Instance of LaneTagLink expected');
  }

  if (!laneTagLink.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(laneTagLink);
};

module.exports = LaneTagLinksMapper;
