
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var logoutService = angular.module('LogoutService', []);

logoutService.factory('LogoutService', ['$http', function ($http) {

  return {
    logout : function () {
      return $http.get('/logout');
    },
  }
}]);
