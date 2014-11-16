
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var kogoAdminApp = angular.module(
  'KogoAdminApp',
  [
    // nothing here
  ]
);

kogoAdminApp.controller(
  'LoginController',
  ['$scope', 'LoginService', '$window',
    function ($scope, LoginService, $window)
    {
      $scope.login = function (loginForm) {
        LoginService.login(loginForm)
          .then(function () {
            $window.location.href = '/';
          });
      }
}]);
