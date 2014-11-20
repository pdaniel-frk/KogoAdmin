
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var appRoutes = angular.module('appRoutes', [])

appRoutes.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    // home page (dashboard view)
    .when('/', {
      templateUrl: '/static/views/dashboard.html',
      controller: 'DashboardController'
    })

    // action called on logout
    .when('/logout', {
      template: '',
      controller: 'LogoutController'
    })

    // ------ Projects and boards related ------ //

    // list of all projects
    .when('/projects', {
      templateUrl: '/static/views/projects/list.html',
      controller: 'ProjectsListController'
    })

    // list all boards of project
    .when('/projects/:projectId', {
      templateUrl: '/static/views/boards/list.html',
      controller: 'BoardsListController',
    })

    // manage lanes of selected board
    .when('/projects/:projectId/boards/:boardId', {
      templateUrl: '/static/views/boards/view.html',
      controller: 'BoardController'
    })

    // ------ Users related ------ //

    .when('/users', {
      templateUrl: '/static/views/users/list.html',
      controller: 'UsersListController'
    })

    // user details
    .when('/users/:userId', {
      templateUrl: '/static/views/users/view.html',
      controller: 'UserController'
    })

    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

}]);
