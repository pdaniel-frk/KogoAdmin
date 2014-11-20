
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all Project service related files
 */

// export all routes
module.exports.Routes = {
  Api: require('./lib/routes/api')
};

// export all services
module.exports.Services = {
  Projects: require('./lib/services/projects')
};

// export all mappers
module.exports.Mappers = {
  Projects: require('./lib/mappers/projects')
};

// export all models
module.exports.Models = {
  Project: require('./lib/models/project')
};
