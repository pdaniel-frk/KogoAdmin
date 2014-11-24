
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var app = angular.module(
  'kogoAdminApp',
  [
    'ngRoute',
    'ngSanitize',
    'appRoutes',
    'angularFileUpload',
    'ui.bootstrap',

    'BoardsListController',
    'BoardModalController',
    'BoardController',
    'ProjectsListController',
    'ProjectModalController',
    'UsersListController',
    'UserController',
    'UserModalController',
    'DashboardController',
    'LaneModalController',
    'LogoutController',

    'BoardsService',
    'ProjectsService',
    'LanesService',
    'UsersService',
    'LogoutService'
  ]
);

// init global user data
app.run(["$rootScope", "UsersService", function($rootScope, UsersService){

  // get currently logged user details
  if (!$rootScope.user) {
    UsersService.getInfo()
      .then(function(user) {
        $rootScope.identity = user;
      });
  };

  $rootScope.showModal = function(modalSelector) {
    modalSelector = modalSelector || '.modal';
    $(modalSelector).modal(
      {
        show:true,
        backdrop: 'static'
      }
    );
    $rootScope.currentModalSelector = modalSelector;
  }

  $rootScope.hideModal = function(modalSelector) {
    modalSelector = modalSelector || '.modal';
    $(modalSelector).modal('hide');
    $rootScope.currentModalSelector = null;
  };

  // method used to show any type of alert
  $rootScope.showAlert = function (alertType, alertSelector, message) {
    var alert = $(alertSelector);
    alert.removeClass().addClass('alert alert-' + alertType + ' alert-dismissable');
    alert.children('.message').html(message);
    alert.show();
  };

  // method used to show success alert
  $rootScope.showSuccessAlert = function(alertSelector, message) {
    $rootScope.showAlert('success', alertSelector, message);
  };

  // method used to show info alert
  $rootScope.showInfoAlert = function(alertSelector, message) {
    $rootScope.showAlert('info', alertSelector, message);
  };

  // method used to show warning alert
  $rootScope.showWarningAlert = function(alertSelector, message) {
    $rootScope.showAlert('warning', alertSelector, message);
  };

  // method used to show danger alert
  $rootScope.showDangerAlert = function(alertSelector, message) {
    $rootScope.showAlert('danger', alertSelector, message);
  };

  // method used to hide alert
  $rootScope.hideAlert = function(alertSelector) {
    var alert = $(alertSelector);
    alert.hide();
  };

  // setting up underscore
  $rootScope._ = window._;

  // setting up underscore
  $rootScope.Math = window.Math;
}]);
