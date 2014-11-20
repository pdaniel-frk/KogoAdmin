
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var HttpMapper   = require(LIBRARY_PATH + '/mappers/http');
var Account      = require('./../models/account');
var util         = require('util');
var Exception    = require(LIBRARY_PATH + '/exception');
var _            = require('underscore');
var QueryBuilder = require(LIBRARY_PATH + '/routes/queryBuilder');

/**
 * Accounts mapper class definition
 */
function AccountsMapper(httpClient) {
  HttpMapper.call(this, httpClient);
};

/**
 * AccountsMapper extends HttpMapper
 */
util.inherits(AccountsMapper, HttpMapper);

/**
 * Placeholder for URL to API's account resource
 */
AccountsMapper.prototype.apiUrl = '/accounts';

/**
 * Method fetches all records matching passed query builder's criteria
 *
 * @param  QueryBuilder queryBuilder Used to specify the query
 * @return Promise      promise      Promise of data from DB
 */
AccountsMapper.prototype.fetchAll = function (queryBuilder) {
  return this.sendGetRequest(queryBuilder);
};

AccountsMapper.prototype.save = function (account) {

  if (!(account instanceof Account)) {
    throw new Exception('Invalid model passed. Instance of Account expected');
  }

  if (!account.getId()) {
    return this.insert(account);
  }

  var me = this;
  var queryBuilder = new QueryBuilder()
  queryBuilder.setConditions({id: account.getId()});
  return this.fetchAll(queryBuilder)
    .then(function (accounts) {

      if (!_.isEmpty(accounts)) {
        return me.update(account);
      }

      return me.insert(account);
    });
};

AccountsMapper.prototype.insert = function (account) {

  if (!(account instanceof Account)) {
    throw new Exception('Invalid model passed. Instance of Account expected');
  }

  return this.sendPostRequest(account);
};

AccountsMapper.prototype.update = function (account) {

  if (!(account instanceof Account)) {
    throw new Exception('Invalid model passed. Instance of Account expected');
  }

  if (!account.getId()) {
    throw new Exception('Invalid logic. Insert should be called');
  }

  return this.sendPutRequest(account);
};

module.exports = AccountsMapper;
