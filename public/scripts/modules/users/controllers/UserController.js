
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var userController = angular.module(
  'UserController',
  [
    'UsersService'
  ]
);

userController.controller(
  'UserController',
  function ($scope, $routeParams, UsersService
) {

    $scope.userId = $routeParams.userId;

    UsersService.getById($scope.userId)
      .then(function (user) {
        $scope.user = user;
      });
});
