
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all ApiAccount service related files
 */

// export all routes
module.exports.Routes = {
  Api: require('./lib/routes/api')
};

// export all services
module.exports.Services = {
  ApiAccounts: require('./lib/services/apiAccounts')
};

// export all mappers
module.exports.Mappers = {
  ApiAccounts: require('./lib/mappers/apiAccounts')
};

// export all models
module.exports.Models = {
  ApiAccount: require('./lib/models/apiAccount')
};
