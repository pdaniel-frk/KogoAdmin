
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var kogoAdminApp = angular.module(
  'kogoAdminApp',
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
          }, function () {
            showAlert(
              'danger',
              '#login-box .alert',
              '<b>Error!</b> Incorrect username or password.'
            );
          });
      }

      // this method is a copy from app.js as we don't want to
      // include the whole app for login only
      $scope.hideAlert = function (alertSelector) {
        var alert = $(alertSelector);
        alert.hide();
      };

      // this method is a copy from app.js as we don't want to
      // include the whole app for login only
      var showAlert = function (alertType, alertSelector, message) {
        var alert = $(alertSelector);
        alert.removeClass().addClass('alert alert-' + alertType + ' alert-dismissable');
        alert.children('.message').html(message);
        alert.show();
      };
}]);
