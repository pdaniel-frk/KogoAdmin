
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Tag          = require('./../models/tag');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Tags mapper class definition
 */
function TagsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * TagsMapper extends HttpMapper
 */
util.inherits(TagsMapper, HttpMapper);

/**
 * Placeholder for URL to API's tag resource
 */
TagsMapper.prototype.apiUrl = '/tags';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
TagsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

TagsMapper.prototype.save = function (tag) {

  if (!(tag instanceof Tag)) {
    throw new Exception('Invalid model passed. Instance of Tag expected');
  }

  if (!tag.getId()) {
    return this.insert(tag);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: tag.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (tags) {

      if (!_.isEmpty(tags)) {
        return me.update(tag);
      }

      return me.insert(tag);
    });
};

TagsMapper.prototype.insert = function (tag) {

  if (!(tag instanceof Tag)) {
    throw new Exception('Invalid model passed. Instance of Tag expected');
  }

  return this.sendPostRequest(tag);
};

TagsMapper.prototype.update = function (tag) {

  if (!(tag instanceof Tag)) {
    throw new Exception('Invalid model passed. Instance of Tag expected');
  }

  if (!tag.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(tag);
};

module.exports = TagsMapper;
