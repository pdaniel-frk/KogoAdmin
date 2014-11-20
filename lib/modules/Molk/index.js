
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

/**
 * This file will load all Molk service related files
 */

// export all routes
module.exports.Routes = {
  Roles: require('./lib/routes/roles'),
  RolePermissions: require('./lib/routes/rolePermissions'),
  RolePermissionLinks: require('./lib/routes/rolePermissionLinks'),
  RoleGroups: require('./lib/routes/roleGroups')
}

// export all services
module.exports.Services = {
  Roles: require('./lib/services/roles'),
  RolePermissions: require('./lib/services/rolePermissions'),
  RolePermissionLinks: require('./lib/services/rolePermissionLinks'),
  RoleGroups: require('./lib/services/roleGroups')
}

// export all mappers
module.exports.Mappers = {
//  Roles: require('./lib/mappers/roles'),
//  RolePermissions: require('./lib/mappers/rolePermission'),
//  RolePermissionLinks: require('./lib/mappers/rolePermissionLink'),
//  RoleGroups: require('./lib/mappers/roleGroup')
}

// export all models
module.exports.Models = {
//  Role: require('./lib/models/role'),
//  RolePermission: require('./lib/models/rolePermission'),
//  RolePermissionLink: require('./lib/models/rolePermissionLink'),
//  RoleGroup: require('./lib/models/roleGroup')
}
