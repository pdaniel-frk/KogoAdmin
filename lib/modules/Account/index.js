
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all Account service related files
 */

// export all routes
module.exports.Routes = {
  Api: require('./lib/routes/api')
};

// export all services
module.exports.Services = {
  Accounts: require('./lib/services/accounts')
};

// export all mappers
module.exports.Mappers = {
  Accounts: require('./lib/mappers/accounts')
};

// export all models
module.exports.Models = {
  Account: require('./lib/models/account')
};
