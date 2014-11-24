
/**
 * KogoAdmin (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/KogoAdmin for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/KogoAdmin/blob/master/LICENSE.md Proprietary software
 */

var usersListController = angular.module(
  'UsersListController',
  [
    'UsersService'
  ]
);

usersListController.controller(
  'UsersListController',
  [ '$scope', '$routeParams', 'UsersService', '$modal',
  function ($scope, $routeParams, UsersService, $modal)
{
  // default users list
  $scope.users = [];

  // method gets all users
  $scope.getUsers = function() {
    UsersService.get()
      .then(function(users) {
        $scope.users = users;
      })
  };

  // Always called method to get all users
  $scope.getUsers();

  // ---------------------------------------------
  // ---------- MODAL RELEATED FUNCTIONS ---------
  // ---------------------------------------------

  $scope.showCreateUserModal = function () {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/users/create.html',
      controller: 'UserModalController',
      backdrop: 'static',
      resolve: {
        user : function () {
          return {
            "status" : "active",
            "roleId" : 3 // user
          }
        }
      }
    });

    modalInstance.result.then(function (user) {

      // add user to local scope
      $scope.users.push(user);

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> User was created sucessfully'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

  $scope.showEditUserModal = function (user) {

    delete user.password;
    delete user.avatar;

    var modalInstance = $modal.open({
      templateUrl: 'static/views/users/edit.html',
      controller: 'UserModalController',
      backdrop: 'static',
      resolve: {
        user : function () {
          return user;
        }
      }
    });

    modalInstance.result.then(function (user) {

      // find and update user data in local scope
      var index;
      for (index = 0; index < $scope.users.length; index++) {
        if ($scope.users[index].id === user.id) {
          $scope.users[index] = user;
          break;
        }
      }

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> User was updated sucessfully'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

  $scope.showDeleteUserModal = function (user) {

    var modalInstance = $modal.open({
      templateUrl: 'static/views/users/delete.html',
      controller: 'UserModalController',
      backdrop: 'static',
      resolve: {
        user : function () {
          return user;
        }
      }
    });

    modalInstance.result.then(function (user) {

      // update status of deleted user
      var index;
      for (index = 0; index < $scope.users.length; index++) {
        if ($scope.users[index].id === user.id) {
          $scope.users[index].status = "deleted";
          break;
        }
      }

      $scope.showSuccessAlert(
        '.content .alert',
        '<b>Sucess</b> User was sucessfully deleted(disabled)'
      );
    }, function () {
      // console.log('modal closed');
    });
  };

}]);
