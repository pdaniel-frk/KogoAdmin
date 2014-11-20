
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var ApiAccount          = require('./../models/apiAccount');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * ApiAccounts mapper class definition
 */
function ApiAccountsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * ApiAccountsMapper extends HttpMapper
 */
util.inherits(ApiAccountsMapper, HttpMapper);

/**
 * Placeholder for URL to API's apiAccount resource
 */
ApiAccountsMapper.prototype.apiUrl = '/api-accounts';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
ApiAccountsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

ApiAccountsMapper.prototype.save = function (apiAccount) {

  if (!(apiAccount instanceof ApiAccount)) {
    throw new Exception('Invalid model passed. Instance of ApiAccount expected');
  }

  if (!apiAccount.getId()) {
    return this.insert(apiAccount);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: apiAccount.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (apiAccounts) {

      if (!_.isEmpty(apiAccounts)) {
        return me.update(apiAccount);
      }

      return me.insert(apiAccount);
    });
};

ApiAccountsMapper.prototype.insert = function (apiAccount) {

  if (!(apiAccount instanceof ApiAccount)) {
    throw new Exception('Invalid model passed. Instance of ApiAccount expected');
  }

  return this.sendPostRequest(apiAccount);
};

ApiAccountsMapper.prototype.update = function (apiAccount) {

  if (!(apiAccount instanceof ApiAccount)) {
    throw new Exception('Invalid model passed. Instance of ApiAccount expected');
  }

  if (!apiAccount.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(apiAccount);
};

module.exports = ApiAccountsMapper;
