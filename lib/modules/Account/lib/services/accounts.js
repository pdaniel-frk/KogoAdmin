
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var AccountModel  = require('../models/account');
var QueryBuilder  = require(LIBRARY_PATH + '/routes/queryBuilder');
var _             = require('underscore');
var KogoException = require(LIBRARY_PATH + '/exception');

/**
 * Accounts service class definition
 */
function Accounts(accountsMapper) {
  if (!accountsMapper) {
    var AccountsMapper = require('../mappers/accounts');
    var accountsMapper = new AccountsMapper;
  }

  this.accountsMapper = accountsMapper;
}

/**
 * Method gets all accounts matching passed query
 * @param  {[type]}   query    [description]
 * @return Promise results Promise of mapper's results
 */
Accounts.prototype.all = function (query) {

  query = query || new QueryBuilder();

  return this.accountsMapper.fetchAll(query);
};

/**
 * Method gets single account by passed id
 * @param  {[type]} id      [description]
 * @return {[type]} promise [description]
 */
Accounts.prototype.get = function (id) {

  if (!_.isNumber(id) && !_.isString(id)) {
    throw new KogoException('Invalid account id passed');
  }

  var query = new QueryBuilder();
  query.setConditions({'id': id});

  return this.all(query)
  .then(function (accounts) {
    if (!_.isArray(accounts) || _.isEmpty(accounts)) {
      return null;
    }
    return accounts.shift();
  });
};

/**
 * Method saves the passed data using mapper with inflated
 * model
 *
 * @param  {[type]}   data     [description]
 * @return {[type]}            [description]
 */
Accounts.prototype.save = function (data) {

  if (!_.isObject(data)) {
    throw new KogoException('Invalid data provided. Object describing model properties expected.')
  }

  var account = new AccountModel(data);
  return this.accountsMapper.save(account)
    .then(function (accountData) {
      return new AccountModel(accountData);
    });
};

module.exports = Accounts;
