
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all Sprint service related files
 */

// export all routes
module.exports.Routes = {
  Api: require('./lib/routes/api')
}

// export all services
module.exports.Services = {
  Sprints: require('./lib/services/sprints')
}

// export all mappers
module.exports.Mappers = {
  Sprints: require('./lib/mappers/sprints')
}

// export all models
module.exports.Models = {
  Sprint: require('./lib/models/sprint')
}
