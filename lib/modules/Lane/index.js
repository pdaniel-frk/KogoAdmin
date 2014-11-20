
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all Lane service related files
 */

// export all routes
module.exports.Routes = {
  Api: require('./lib/routes/api'),
  Frontend: require('./lib/routes/frontend')
};

// export all services
module.exports.Services = {
  Lanes: require('./lib/services/lanes')
};

// export all mappers
module.exports.Mappers = {
  Lanes: require('./lib/mappers/lanes')
};

// export all models
module.exports.Models = {
  Lane: require('./lib/models/lane')
};
