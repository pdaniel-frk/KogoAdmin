
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
  [ '$scope', '$routeParams', '$upload', 'UsersService',
  function ($scope, $routeParams, $upload, UsersService)
{
  // default users list
  $scope.users = [];

  // method gets all users
  $scope.getUsers = function() {
    UsersService.get(
        {
          conditions : {
            status: ['pending','active','inactive','suspended']
          }
        }
      )
      .then(function(users) {
        $scope.users = users;
      })
  };

  // method saves user
  $scope.saveUser = function(user) {
    return UsersService.save(user);
  };

  // method soft-deletes user by id
  $scope.deleteUser = function(userId) {
    return UsersService.update(userId, {status:"deleted"});
  };

  // ---------------------------------------------
  // ---------- MODAL RELEATED FUNCTIONS ---------
  // ---------------------------------------------

  // method called to open new user modal
  $scope.showCreateUserModal = function(modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    // modal values
    $scope.user = {
      status : "active"
    };

    $scope.modalTitle = 'Add user';
  };

  // method called to open edit user modal
  $scope.showEditUserModal = function(user, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    $scope.user = _.extend({}, user);
    $scope.modalTitle = 'Edit user';
  };

  // method called to save modal's data
  $scope.saveModalData = function(userData) {

    if (_.isEmpty(userData)) {
      $scope.showDangerAlert(
        '.content .alert',
        '<b>Sorry</b> You need to fill the form before saving it'
      );
      return;
    }

    $scope.saveUser(userData)
      .then(function(user) {

        // new record
        if (!userData.id) {
          $scope.users.push(user);

        // updated record
        } else {

          var index, tempUser;
          for (index = 0; index < $scope.users.length; index++) {
            tempUser = $scope.users[index];
            if (user.id == tempUser.id) {
              $scope.users[index] = user;
            }
          }
        }

        $scope.closeModal($scope.currentModalSelector);

        $scope.showSuccessAlert(
          '.content .alert',
          '<b>Sucess</b> User was saved sucessfully'
        );
      });
  }

  // method called to close modal
  $scope.closeModal = function(modalSelector) {
    $scope.hideModal(modalSelector);
  }

  // method called to open delete user modal
  $scope.showDeleteUserModal = function(user, modalSelector) {
    // init modal
    $scope.showModal(modalSelector);

    $scope.user = _.extend({}, user);
  };

  // method called when deletion is confirmed
  $scope.deleteModalUser = function(user) {

    if (!user || !user.id) {
      $scope.showDangerAlert(
        '.content .alert',
        '<b>Sorry</b> There was an issue with your request - please try again later.'
      );
    }

    $scope.deleteUser(user.id)
      .then(function(updated) {

        var index, tempUser;
        for (index = 0; index < $scope.users.length; index++) {
          tempUser = $scope.users[index];
          if (user.id == tempUser.id) {
            $scope.users.splice(index, 1);
          }
        }

        $scope.closeModal($scope.currentModalSelector);

        $scope.showSuccessAlert(
          '.content .alert',
          '<b>Sucess</b> User was deleted sucessfully'
        );
      });
  };

  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: '/api/users/avatars', //upload.php script, node.js route, or servlet url
        //method: 'POST' or 'PUT',
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        data: {myObj: $scope.user.avatar},
        file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully

        if (data.path) {
          // assigning temp path
          $scope.user.avatar = data.path;
        }
      });
      //.error(...)
      //.then(success, error, progress);
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };


  // Always called method to get all users
  $scope.getUsers();
}]);
