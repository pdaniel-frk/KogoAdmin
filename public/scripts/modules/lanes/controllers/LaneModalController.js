
/**
 * Kogo (http://www.kogo.hedonsoftware.com/)
 *
 * @link      https://github.com/HedonSoftware/Kogo for the canonical source repository
 * @copyright Copyright (c) 2014 HedonSoftware Limited (http://www.hedonsoftware.com)
 * @license   https://github.com/HedonSoftware/Kogo/blob/master/LICENSE.md Proprietary software
 */

var laneModalController = angular.module(
  'LaneModalController',
  [
    'LanesService',
    'ProjectsService'
  ]
);

laneModalController.controller(
  'LaneModalController',
  [
    "$scope", "$modalInstance", "LanesService", "ProjectsService", "lane",
    function ($scope, $modalInstance, LanesService, ProjectsService, lane
    ) {

      $scope.modalLane = _.extend({}, lane);

      // method called to create lane
      $scope.createLane = function (lane) {

        if (!_.isObject(lane)) {
          throw 'Invalid lane passed';
        }

        return LanesService.save(lane);
      }

      // method called to update lane
      $scope.updateLane = function (lane) {

        if (!_.isObject(lane)) {
          throw 'Invalid lane passed';
        }

        return LanesService.save(lane);
      }

      // method gets all projects
      ProjectsService.get()
        .then(function (projects) {
          $scope.modalProjects = projects;
      });

      // ---------------------------------------------
      // ---------- MODAL RELEATED FUNCTIONS ---------
      // ---------------------------------------------

      /**
       * Function called when 'create lane' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save lane
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.create = function (lane) {

        // saving lane
        return $scope.createLane(lane)
          .then(function (lane) {
            $modalInstance.close(lane);
          }, function (error) {
            console.log(error);
          });
      };

      /**
       * Function called when 'update lane' was clicked
       *
       * Role:
       * - validate form input
       *   * if error -> show error
       * - use service to save lane
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.update = function (lane) {

        // saving lane
        return $scope.updateLane(lane)
          .then(function (lane) {
            $modalInstance.close(lane);
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
       * - use service to save lane
       *   * if sucess -> close modal
       *   * else -> show error
       */
      $scope.delete = function (lane) {

        var data = {
          "id" : lane.id,
          "status" : "deleted"
        };

        // saving lane
        return $scope.updateLane(data)
          .then(function (lane) {
            $modalInstance.close(lane);
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
