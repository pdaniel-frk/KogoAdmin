
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var userModalController = angular.module(
  'UserModalController',
  [
    'UsersService'
  ]
);

userModalController.controller(
  'UserModalController',
  [
    "$scope", "$modalInstance", "$upload", "UsersService", "user",
    function ($scope, $modalInstance, $upload, UsersService, user
    ) {

      $scope.modalUser = _.extend({}, user);

      // method called to create user
      $scope.createUser = function (user) {

        if (!_.isObject(user)) {
          throw 'Invalid user passed';
        }

        return UsersService.save(user);
      }

      // method called to update user
      $scope.updateUser = function (user) {

        if (!_.isObject(user)) {
          throw 'Invalid user passed';
        }

        return UsersService.save(user);
      }

      // ---------------------------------------------
      // ---------- MODAL RELEATED FUNCTIONS ---------
      // ---------------------------------------------

      /**
       * Function called when 'create user' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save user
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.create = function (user) {

        // validation

        // saving user
        return $scope.createUser(user)
          .then(function (user) {
            $modalInstance.close(user);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Function called when 'update user' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save user
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.update = function (user) {

        // delete password if not updated
        if (!user.password) {
          delete user.password;
        }

        // saving user
        return $scope.updateUser(user)
          .then(function (user) {
            $modalInstance.close(user);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Function called when 'delete' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save user
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.delete = function (user) {

        var data = {
          "id" : user.id,
          "status" : "deleted"
        };

        // saving user
        return $scope.updateUser(data)
          .then(function (user) {
            $modalInstance.close(user);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Cancel method called when 'cancel' button
       * was clicked
       */
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
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
            data: {myObj: $scope.modalUser.avatar},
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
              $scope.modalUser.avatar = data.path;
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
    }
  ]
);
