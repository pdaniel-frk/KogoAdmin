
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Comment      = require('./../models/comment');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Comments mapper class definition
 */
function CommentsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * CommentsMapper extends HttpMapper
 */
util.inherits(CommentsMapper, HttpMapper);

/**
 * Placeholder for URL to API's comment resource
 */
CommentsMapper.prototype.apiUrl = '/comments';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
CommentsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

CommentsMapper.prototype.save = function (comment) {

  if (!(comment instanceof Comment)) {
    throw new Exception('Invalid model passed. Instance of Comment expected');
  }

  if (!comment.getId()) {
    return this.insert(comment);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: comment.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (comments) {

      if (!_.isEmpty(comments)) {
        return me.update(comment);
      }

      return me.insert(comment);
    });
};

CommentsMapper.prototype.insert = function (comment) {

  if (!(comment instanceof Comment)) {
    throw new Exception('Invalid model passed. Instance of Comment expected');
  }

  return this.sendPostRequest(comment);
};

CommentsMapper.prototype.update = function (comment) {

  if (!(comment instanceof Comment)) {
    throw new Exception('Invalid model passed. Instance of Comment expected');
  }

  if (!comment.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(comment);
};

module.exports = CommentsMapper;
