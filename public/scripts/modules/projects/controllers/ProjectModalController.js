
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var projectModalController = angular.module(
  'ProjectModalController',
  [
    'ProjectsService'
  ]
);

projectModalController.controller(
  'ProjectModalController',
  [
    "$scope", "$modalInstance", "ProjectsService", "project",
    function ($scope, $modalInstance, ProjectsService, project
    ) {

      $scope.modalProject = _.extend({}, project);

      // method called to create project
      $scope.createProject = function (project) {

        if (!_.isObject(project)) {
          throw 'Invalid project passed';
        }

        return ProjectsService.save(project);
      }

      // method called to update project
      $scope.updateProject = function (project) {

        if (!_.isObject(project)) {
          throw 'Invalid project passed';
        }

        return ProjectsService.save(project);
      }

      // ---------------------------------------------
      // ---------- MODAL RELEATED FUNCTIONS ---------
      // ---------------------------------------------

      /**
       * Function called when 'create project' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save project
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.create = function (project) {

        // validation

        // saving project
        return $scope.createProject(project)
          .then(function (project) {
            $modalInstance.close(project);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Function called when 'update project' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save project
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.update = function (project) {

        // saving project
        return $scope.updateProject(project)
          .then(function (project) {
            $modalInstance.close(project);
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
       * - use service to save project
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.delete = function (project) {

        var data = {
          "id" : project.id,
          "status" : "deleted"
        };

        // saving project
        return $scope.updateProject(data)
          .then(function (project) {
            $modalInstance.close(project);
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
    }
  ]
);
